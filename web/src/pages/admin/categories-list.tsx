import { useState } from "react";
import MaterialTable from "@material-table/core"
import { useLoadData } from "hooks/useLoadData"
import { Category } from "models/Category";
import { LoadingComponent } from "components/LoadingComponent";
import { getCategories } from "services/categories.service";
import { Avatar } from "@material-ui/core";
export const CategoriesList = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const { loading } = useLoadData(async () => {
        const req = await getCategories();
        const categories = req.data;
        console.log(categories);
        setCategories(categories);
    }, []);

    if (loading) {
        return <LoadingComponent />
    }

    return <div className="table-list-pagination-bottom">
        <MaterialTable
            columns={[
                { title: "ID", field: "id" },
                { title: "Name", field: "name" },
                {
                    title: "Image", field: "imageurl", render: (rowData) => <Avatar
                        variant="rounded"
                        style={{
                            width: "100px",
                            height: "100px"
                        }}
                        src={rowData.imageurl}
                    />
                }
            ]}
            data={categories}
            options={{
                search: true
            }}
        />
    </div>

}