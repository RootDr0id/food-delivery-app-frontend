import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";

/**
 * A page that displays the order status of all the user's orders.
 *
 * Fetches the user's orders from the backend api and renders a list of them.
 * Each order is rendered with an OrderStatusHeader and an OrderStatusDetail.
 * The OrderStatusHeader displays the order's status and the OrderStatusDetail
 * displays the order's details, including the items in the order, the total cost,
 * and the delivery address.
 *
 * If the orders are not yet loaded, renders "Loading..."
 * If the user has no orders, renders "No orders found"
 */
const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();//Hook that fetches my orders from our backend api

  if (isLoading) {
    return "Loading...";
  }

  if (!orders || orders.length === 0) {
    return "No orders found";
  }

  return (
    <div className="space-y-10">
      {orders.map((order) => (
        <div className="space-y-10 bg-gray-50 p-10 rounded-lg">
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetail order={order} />
            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imageUrl}
                className="rounded-md object-cover h-full w-full"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusPage;
