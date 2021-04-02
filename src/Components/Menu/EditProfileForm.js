import React, { useState, useCallback } from 'react';
import produce from 'immer';
import merge from 'lodash/merge';
import { v4 as uuid } from 'uuid';
import { Pane, TextInputField, Switch, FormField, Button, TickIcon, TrashIcon, IconButton } from 'evergreen-ui';

export const EditProfileForm = ({ profile = { id: uuid() }, onCancel, onSave, onDelete }) => {
  const [local, setLocalProfile] = useState({ ...profile });
  const updateLocal = useCallback((fields = {}) => setLocalProfile(produce(local, draft => {
    return merge(draft, fields);
  })), [local]);

  const onSwitchChange = useCallback(
    (name) => (e) => updateLocal({ [name]: e.target.checked }),
    [updateLocal]
  );
  const onTextFieldChange = useCallback(
    (name) => (e) => updateLocal({ [name]: e.target.value }),
    [updateLocal]
  );

  const onFormSave = useCallback(() => {
    if (onSave) onSave(local);
  }, [local, onSave]);

  const onProfileDelete = useCallback(() => {
    if (onDelete) onDelete(local);
  }, [local, onDelete]);

  return (
    <Pane>
      <FormField label="OAuth Mode" marginBottom={15}>
        <Switch checked={local.oauth} onChange={onSwitchChange('oauth')} />
      </FormField>
      <TextInputField label="Profile Name" value={local.name} marginBottom={5} marginRight={20} onChange={onTextFieldChange('name')} />
      <TextInputField label="URL" value={local.url} marginBottom={5} marginRight={20} onChange={onTextFieldChange('url')} />
      <TextInputField label="Username" value={local.username} marginBottom={5} marginRight={20} onChange={onTextFieldChange('username')} />
      <TextInputField label="Password" value={local.password} marginBottom={5} marginRight={20} onChange={onTextFieldChange('password')} />
      <TextInputField label="Client ID" value={local.clientId} marginBottom={5} marginRight={20} onChange={onTextFieldChange('clientId')} />
      <TextInputField label="Client Key" value={local.clientKey} marginBottom={15} marginRight={20} onChange={onTextFieldChange('clientKey')} />
      <Pane display="flex" marginRight={20}>
        <Pane>
          <IconButton icon={TrashIcon} intent="danger" onClick={onProfileDelete} />
        </Pane>
        <Pane flex={1} display="flex" justifyContent="flex-end" />
        <Button appearance="minimal" onClick={onCancel} marginRight={5}>Cancel</Button>
        <Button appearance="primary" intent="success" iconAfter={TickIcon} onClick={onFormSave}>Save</Button>
      </Pane>
    </Pane>
  )
};
