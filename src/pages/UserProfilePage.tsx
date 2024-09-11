import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

/**
 * Page that displays the current user's profile information and
 * allows them to update it.
 *
 * It uses the useGetMyUser and useUpdateMyUser hooks to fetch the
 * current user and update the user profile, respectively.
 *
 * If the user is not found, it displays a message indicating that
 * the user profile could not be loaded.
 *
 * If the user is found, it renders the UserProfileForm with the
 * current user's information and the onSave function set to the
 * updateUser function from the useUpdateMyUser hook.
 *
 * The isLoading prop is set to true if the user profile is still
 * being fetched or if the update request is in progress.
 */
const UserProfilePage = () => {
  // We add our hooks defined in MyUserApi in here
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();

  if (isGetLoading) {
    return <span>Loading...</span>;
  }

  if (!currentUser) {
    return <span>Unable to load user profile</span>;
  }
  
  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  );
};

export default UserProfilePage;
