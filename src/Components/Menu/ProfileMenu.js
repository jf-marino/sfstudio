import React, { useState } from 'react';
import produce from 'immer';
import { useRecoilState, useRecoilValue } from "recoil";
import { Pane, Heading, Text, IconButton, ArrowLeftIcon, Menu, Button, PlusIcon } from 'evergreen-ui';
import { Profiles, FindProfile } from '../../State/Profiles';
import { EditProfileForm } from "./EditProfileForm";

export const ProfileMenu = (props) => {
  const [editing, setEditing] = useState(undefined);
  const [isCreating, setIsCreating] = useState(false);
  const [profiles, setProfiles] = useRecoilState(Profiles);
  const findProfile = useRecoilValue(FindProfile);
  const profileBeingEdited = findProfile(editing);
  const editProfile = (id) => setEditing(id);
  const backToList = () => {
    setEditing(undefined);
    setIsCreating(false);
  };

  const updateProfiles = (newProfile) => {
    setProfiles(produce(profiles, draft => {
      draft[newProfile.id] = newProfile;
    }));
  };

  const removeProfile = (profile) => {
    setProfiles(produce(profiles, draft => {
      delete draft[profile.id];
    }));
  };

  const onEditProfileSave = (newProfile) => {
    updateProfiles(newProfile);
    backToList();
  };

  const onRemoveProfile = (profileToRemove) => {
    removeProfile(profileToRemove);
    backToList();
  }

  return (
    <Pane margin={10} display="flex" flexDirection="column" {...props}>
      <Heading size={600} marginBottom={20}>List of Profiles</Heading>
      {!profileBeingEdited && !isCreating && (
        <Pane flex={1} display="flex" flexDirection="column">
          <Pane flex={1} borderBottom>
            <Menu>
              {Object.entries(profiles).map(([, profile]) => (
                <Menu.Item onClick={() => editProfile(profile.id)}>
                  <Text>{profile.name}</Text>
                </Menu.Item>
              ))}
            </Menu>
          </Pane>
          <Pane margin={10} display="flex" justifyContent="flex-end">
            <Button iconBefore={PlusIcon} intent="success" onClick={() => setIsCreating(true)}>New Profile</Button>
          </Pane>
        </Pane>
      )}
      {profileBeingEdited && (
        <Pane display="flex" alignItems="flex-start" padding={20} margin={0} elevation={2}>
          <Pane>
            <IconButton icon={ArrowLeftIcon} appearance="minimal" onClick={backToList}/>
          </Pane>
          <Pane paddingLeft={20} flex={1}>
            <Heading paddingTop={7} paddingBottom={10}>Editing Profile '{profileBeingEdited.name}'</Heading>
            <EditProfileForm profile={profileBeingEdited} onCancel={backToList} onSave={onEditProfileSave} onDelete={onRemoveProfile}/>
          </Pane>
        </Pane>
      )}
      {isCreating && (
        <Pane display="flex" alignItems="flex-start" padding={20} margin={0} elevation={2}>
          <Pane>
            <IconButton icon={ArrowLeftIcon} appearance="minimal" onClick={backToList}/>
          </Pane>
          <Pane paddingLeft={20} flex={1}>
            <Heading paddingTop={7} paddingBottom={10}>Create a New Profile</Heading>
            <EditProfileForm onCancel={backToList} onSave={onEditProfileSave} onDelete={onRemoveProfile}/>
          </Pane>
        </Pane>
      )}
    </Pane>
  );
};
