import MaterialTable from "@material-table/core"
import { useLoadData } from "hooks/useLoadData";
import { Avatar } from "@material-ui/core"
import { ProductsList as IProductList } from "models/ProductsList";
import { useState } from "react";
import { getAllProducts } from "services/products.service";
import { adminUrls, useRouting } from "utils/routing";
import { LoadingComponent } from "components/LoadingComponent"

export const ProductsList = () => {
    const { routeTo } = useRouting();
    const [products, setProducts] = useState<IProductList[]>([]);
    const { loading } = useLoadData(async () => {
        const z = await getAllProducts();
        setProducts(z.data);
    });
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
            }]}
        />
    </div>
}