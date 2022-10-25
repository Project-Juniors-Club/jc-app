import React from 'react';

import { User } from '../interfaces';

type ListDetailProps = {
  item: User;
};

const ListDetail = ({ item: user }: ListDetailProps) => (
  <div>
    <p>ID: {user.id}</p>
  </div>
);

export default ListDetail;
