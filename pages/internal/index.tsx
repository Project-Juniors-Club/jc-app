import { unstable_getServerSession } from 'next-auth';
import Layout from '../../components/Layout';
import { authOptions } from '../api/auth/[...nextauth]';
import { GetServerSideProps } from 'next';
import prisma from '../../lib/prisma';
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';
import Link from 'next/link';

const InternalPage = ({ sess, admins }) => {
  if (!sess) {
    return <Layout>Access denied</Layout>;
  }

  // If session exists, display content
  return (
    <Layout>
      <h1>Protected Page</h1>
      <p>
        <strong>Welcome {sess.user.name}</strong>
        <strong>Your access is {sess.user.type}</strong>
      </p>

      <TableContainer>
        <Table variant='simple'>
          <TableCaption>List of Staff</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Role</Th>
              <Th>Type</Th>
              <Th>Email</Th>
              <Th>Disabled</Th>
              <Th>Edit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {admins?.map(admin => (
              <Tr key={admin.userId}>
                <Td>{admin.user.name}</Td>
                <Td>{admin.role}</Td>
                <Td>{admin.user.type}</Td>
                <Td>{admin.user.email}</Td>
                <Td>{JSON.stringify(admin.disabled)}</Td>
                <Td>
                  <Link href={'/internal/edit/' + admin.userId}>
                    <a>Edit</a>
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const sess = await unstable_getServerSession(context.req, context.res, authOptions);
  console.log('Server side props in Admin route ' + JSON.stringify(sess));
  const admins = JSON.parse(
    JSON.stringify(
      await prisma.admin.findMany({
        select: {
          user: {
            select: {
              name: true,
              type: true,
              email: true,
            },
          },
          userId: true,
          role: true,
          disabled: true,
        },
      }),
    ),
  );
  console.log(admins);
  return { props: { admins, sess } };
};

export default InternalPage;
