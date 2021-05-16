import MaterialTable from "@material-table/core"
import { useLoadData } from "hooks/useLoadData";
import { useState } from "react";
import { adminUrls, useRouting } from "utils/routing";
import { LoadingComponent } from "components/LoadingComponent"
import { deleteUser, getAllUsers } from "services/user.service";
import { User } from "models/User";

export const UsersList = () => {
    const { routeTo } = useRouting();
    const [users, setUsers] = useState<User[]>([]);
    const [refresh, setRefresh] = useState(false);
    const { loading } = useLoadData(async () => {
        const userReq = await getAllUsers();
        setUsers(userReq.data);
    }, [refresh]);
    if (loading) {
        return <LoadingComponent />
    }

    return <div className="table-list-pagination-bottom">
        <MaterialTable<User>
            title="Users"
            columns={[
                { title: "ID", field: "id" },
                { title: "First Name", field: "firstname" },
                { title: "Last Name", field: "lastname", },
                { title: "email", field: "email" },
                { title: "role", field: "role" }
            ]}
            data={users}
            options={{
                search: true
            }}
            actions={[{
                isFreeAction: true,
                icon: "add",
                tooltip: "Add User",
                onClick: () => {
                    routeTo(adminUrls.userAdd);
                }
            }, {
                isFreeAction: false,
                tooltip: "Delete",
                icon: "delete",
                onClick: async (_, rowData) => {
                    if (!Array.isArray(rowData)) {
                        if (window.confirm(`Are you sure you want to delete row with email ${rowData.email}?`)) {
                            await deleteUser(rowData.id);
                            setRefresh(!refresh);
                        }
                    }
                }
            }, {
                isFreeAction: false,
                tooltip: "Edit",
                icon: "edit",
                onClick: async (_, rowData) => {
                    if (!Array.isArray(rowData)) {
                        routeTo(adminUrls.productEdit, { id: rowData.id });
                    }
                }
            }]}
        />
    </div>
}