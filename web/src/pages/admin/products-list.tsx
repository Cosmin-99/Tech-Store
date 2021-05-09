import MaterialTable from "@material-table/core"
import { adminUrls, useRouting } from "utils/routing";


export const ProductsList = () => {
    const { routeTo } = useRouting();
    return <div className="table-list-pagination-bottom">
        <MaterialTable
            title="Products"
            columns={[
                { title: "ID", field: "id" },
                { title: "Name", field: "name" },
                { title: "Category Name", field: "categoryname", },
                { title: "Category Id", field: "categoryid" }
            ]}
            data={[]}
            options={{
                search: true
            }}
            actions={[{
                isFreeAction: true,
                icon: "add",
                tooltip: "Add Product",
                onClick: () => {
                    routeTo(adminUrls.productAdd);
                }
            }]}
        />
    </div>
}