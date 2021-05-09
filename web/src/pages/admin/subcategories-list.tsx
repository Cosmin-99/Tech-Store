import { useState } from "react";
import MaterialTable from "@material-table/core"
import { useLoadData } from "hooks/useLoadData"
import { Category } from "models/Category";
import { LoadingComponent } from "components/LoadingComponent";
import { getAllSubcategories } from "services/categories.service";
import { Avatar } from "@material-ui/core";
export const SubcategoriesList = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const { loading } = useLoadData(async () => {
        const req = await getAllSubcategories();
        const categories = req.data;
        console.log(categories);
        setCategories(categories);
    }, []);

    if (loading) {
        return <LoadingComponent />
    }

    return <div className="table-list-pagination-bottom">
        <MaterialTable<Category>
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
                },
                { title: "Category Name", field: "categoryname", },
                { title: "Category Id", field: "categoryid" }
            ]}
            data={categories}
            options={{
                search: true
            }}
        />
    </div>

}