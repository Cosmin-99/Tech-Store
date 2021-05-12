import { useState } from "react";
import MaterialTable from "@material-table/core"
import { useLoadData } from "hooks/useLoadData"
import { Category } from "models/Category";
import { LoadingComponent } from "components/LoadingComponent";
import { deleteSubcategory, getAllSubcategories } from "services/categories.service";
import { Avatar } from "@material-ui/core";
import { adminUrls, useRouting } from "utils/routing";
export const SubcategoriesList = () => {
    const { routeTo } = useRouting();
    const [categories, setCategories] = useState<Category[]>([]);
    const [refresh, setRefresh] = useState(false);
    const { loading } = useLoadData(async () => {
        const req = await getAllSubcategories();
        const categories = req.data;
        setCategories(categories);
    }, [refresh]);

    if (loading) {
        return <LoadingComponent />
    }

    return <div className="table-list-pagination-bottom">
        <MaterialTable<Category>
            title="Subcategories"
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
            actions={[{
                isFreeAction: true,
                icon: "add",
                tooltip: "Add Subcategory",
                onClick: () => {
                    routeTo(adminUrls.subCategoryAdd);
                }
            }, {
                isFreeAction: false,
                tooltip: "Delete",
                icon: "delete",
                onClick: async (_, rowData) => {
                    if (!Array.isArray(rowData)) {
                        if (window.confirm(`Are you sure you want to delete ${rowData.name}?`)) {
                            await deleteSubcategory(rowData.id);
                            setRefresh(!refresh);
                        }
                    }
                }
            }]}
        />
    </div>

}