import { atom, DefaultValue, selector } from 'recoil';

const nameState = atom({
    key: 'name',
    default: '',
});

const emailState = atom({
    key: 'email',
    default: '',
});

const roleState = atom({
    key: 'role',
    default: -1,
});

const userInfoState = selector({
    key: 'userInfo',
    get: ({ get }) => {
        //get values from individual atoms
        const name = get(nameState);
        const email = get(emailState);
        const role = get(roleState);

        return { name, email, role };
    },
    set: ({ set }, value) => {
        if (value instanceof DefaultValue) {
            set(nameState, value);
            set(emailState, value);
            set(roleState, value);
        } else {
            set(nameState, value.name);
            set(emailState, value.email);
            set(roleState, value.role);
        }
    },
});