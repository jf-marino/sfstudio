import { atom, selector } from 'recoil';
import { findInObject } from "../utils";

export const Profiles = atom({
  key: 'profiles',
  default: {
    '1': {
      id: '1',
      oauth: true,
      name: 'EOS QA',
      url: 'https://test.salesforce.com',
      clientId: '1234',
      clientKey: '5678',
      username: 'Foo',
      password: 'bar',
    },
    '2': {
      id: '2',
      oauth: false,
      name: 'EOS PROD',
      url: 'https://test.salesforce.com',
      clientId: 'aaaaa',
      clientKey: 'ccccc',
      username: 'Foo',
      password: 'Bar',
    }
  }
});

export const FindProfile = selector({
  key: 'findProfileSelector',
  get: ({ get }) => {
    const profiles = get(Profiles);
    return (id) => findInObject(profiles, id);
  }
});
