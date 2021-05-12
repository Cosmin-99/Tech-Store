import MaterialTable from "@material-table/core"
import { useLoadData } from "hooks/useLoadData";
import { Avatar } from "@material-ui/core"
import { ProductsList as IProductList } from "models/ProductsList";
import { useState } from "react";
import { deleteProduct, getAllProducts } from "services/products.service";
import { adminUrls, useRouting } from "utils/routing";
import { LoadingComponent } from "components/LoadingComponent"

export const ProductsList = () => {
    const { routeTo } = useRouting();
    const [products, setProducts] = useState<IProductList[]>([]);
    const [refresh, setRefresh] = useState(false);
    const { loading } = useLoadData(async () => {
        const z = await getAllProducts();
        setProducts(z.data);
    }, [refresh]);
    if (loading) {
        return <LoadingComponent />
    }

    return <div className="table-list-pagination-bottom">
        <MaterialTable<IProductList>
            title="Products"
            columns={[
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
                { title: "ID", field: "id" },
                { title: "Name", field: "name" },
                { title: "Price", field: "price", },
                { title: "Discount", field: "discount" },
                { title: "Subcategory", field: "subcategoryname" }
            ]}
            data={products}
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
            }, {
                isFreeAction: false,
                tooltip: "Delete",
                icon: "delete",
                onClick: async (_, rowData) => {
                    if (!Array.isArray(rowData)) {
                        if (window.confirm(`Are you sure you want to delete ${rowData.name}?`)) {
                            await deleteProduct(rowData.id);
                            setRefresh(!refresh);
                        }
                    }
                }
            }]}
        />
    </div>
}