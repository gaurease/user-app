import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import classes from "../styles/dashboard.module.css";
import { useRouter } from "next/router";
import Header from "../components/Header";
import UserTable from "../components/Table";
const GET_USERS = gql`
  query {
    users(search: { filter: All, limit: 100 }) {
      users {
        id
        firstName
        lastName
        email
        phone
        role {
          name
          organization {
            name
          }
          department {
            name
          }
        }
      }
      total
    }
  }
`;

export default function Dashboard() {
  const { loading, error, data } = useQuery(GET_USERS, {
    fetchPolicy: "network-only",
  });
  const router = useRouter();

  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      <Header router={router}></Header>
      <div className={classes.filterpanel}>
        <form></form>
      </div>
      <UserTable data={data}></UserTable>
    </div>
  );
}
