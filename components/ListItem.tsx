import React from 'react'
import Link from 'next/link'

import { User } from '../interfaces'

type Props = {
  data: User
}

const ListItem = ({ data }: Props) => (
  <Link href="/users/[id]" as={`/users/${data.pk}`}>
    <a>
<<<<<<< HEAD
      {data.pk}: {data.username}
=======
      {data.id}: {data.username} ({data.email})
>>>>>>> f70600e5c640e4f1c38e953a4570116dd57c3b70
    </a>
  </Link>
)

export default ListItem
