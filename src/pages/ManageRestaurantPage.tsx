import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

  /**
   * Page for managing a restaurant, including viewing active orders and editing the restaurant profile.
   *
   * This page is only accessible by the owner of the restaurant.
   *
   * @returns A JSX element representing the Manage Restaurant page.
   */
const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =useUpdateMyRestaurant();

  const { orders } = useGetMyRestaurantOrders();
  const activeOrders = orders?.filter((order) => order.status !== "delivered");

  const isEditing = !!restaurant;

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">{activeOrders?.length} active orders</h2>
        {activeOrders?.map((order) => (
          <OrderItemCard order={order} />
        ))}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          restaurant={restaurant}
          onSave={ isEditing ? updateRestaurant :  createRestaurant}
          isLoading={isCreateLoading  || isUpdateLoading }
          //
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurantPage;
