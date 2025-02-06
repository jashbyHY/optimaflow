
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Group } from "@/types/groups";

export const useGroupMutations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addGroupMutation = useMutation({
    mutationFn: async (groupData: Omit<Group, "id">) => {
      console.log("Adding group:", groupData);
      const { data, error } = await supabase
        .from("groups")
        .insert([groupData])
        .select()
        .single();
      
      if (error) {
        console.error("Error in addGroupMutation:", error);
        throw error;
      }
      return data;
    },
    onSuccess: (newGroup) => {
      queryClient.setQueryData<Group[]>(["groups"], (oldGroups = []) => {
        return [...oldGroups, newGroup].sort((a, b) => a.name.localeCompare(b.name));
      });
      
      toast({
        title: "Group added",
        description: "The group has been added successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to add group. Please try again.",
        variant: "destructive",
      });
      console.error("Error adding group:", error);
    },
  });

  const updateGroupMutation = useMutation({
    mutationFn: async (group: Group) => {
      console.log("Updating group:", group);
      const { data, error } = await supabase
        .from("groups")
        .update({
          name: group.name,
          description: group.description,
        })
        .eq("id", group.id)
        .select()
        .single();
      
      if (error) {
        console.error("Error in updateGroupMutation:", error);
        throw error;
      }
      return data;
    },
    onSuccess: (updatedGroup) => {
      queryClient.setQueryData<Group[]>(["groups"], (oldGroups = []) => {
        return oldGroups
          .map(g => g.id === updatedGroup.id ? updatedGroup : g)
          .sort((a, b) => a.name.localeCompare(b.name));
      });
      
      toast({
        title: "Group updated",
        description: "The group has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to update group. Please try again.",
        variant: "destructive",
      });
      console.error("Error updating group:", error);
    },
  });

  const removeGroupMutation = useMutation({
    mutationFn: async (groupId: string) => {
      console.log("Starting group removal for ID:", groupId);
      
      // First, get the group to check if it's the Unassigned group
      const { data: group, error: groupError } = await supabase
        .from("groups")
        .select("name")
        .eq("id", groupId)
        .single();

      if (groupError) {
        console.error("Error fetching group:", groupError);
        throw groupError;
      }

      if (group.name === "Unassigned") {
        throw new Error("Cannot delete the Unassigned group");
      }

      // Get the Unassigned group
      const { data: unassignedGroup, error: unassignedError } = await supabase
        .from("groups")
        .select("id")
        .eq("name", "Unassigned")
        .single();

      if (unassignedError) {
        console.error("Error finding Unassigned group:", unassignedError);
        throw unassignedError;
      }

      console.log("Found Unassigned group:", unassignedGroup);

      // Move all technicians to Unassigned group
      const { error: updateError } = await supabase
        .from("technicians")
        .update({ group_id: unassignedGroup.id })
        .eq("group_id", groupId);

      if (updateError) {
        console.error("Error updating technicians:", updateError);
        throw updateError;
      }

      console.log("Updated technicians to Unassigned group");

      // Now delete the group
      const { error: deleteError } = await supabase
        .from("groups")
        .delete()
        .eq("id", groupId);

      if (deleteError) {
        console.error("Error deleting group:", deleteError);
        throw deleteError;
      }

      console.log("Successfully deleted group");
      return groupId;
    },
    onSuccess: (groupId) => {
      queryClient.setQueryData<Group[]>(["groups"], (oldGroups = []) => {
        return oldGroups.filter(g => g.id !== groupId);
      });
      
      // Also invalidate technicians query since their groups might have changed
      queryClient.invalidateQueries({ queryKey: ["technicians"] });
      
      toast({
        title: "Group removed",
        description: "The group has been removed successfully.",
      });
    },
    onError: (error: any) => {
      const errorMessage = error?.message === "Cannot delete the Unassigned group" 
        ? "The Unassigned group cannot be deleted."
        : error?.message || "Failed to remove group. Please try again.";
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Error removing group:", error);
    },
  });

  return {
    addGroupMutation,
    updateGroupMutation,
    removeGroupMutation,
  };
};
