import { MenuItem } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  menuItem: MenuItem;
  addToCart: () => void;
};

/**
 * Component to render a single menu item in the menu list.
 * When clicked, it adds the item to the cart.
 *
 * @param {{menuItem: MenuItem, addToCart: () => void}} props
 * @prop {MenuItem} menuItem menu item to be rendered
 * @prop {() => void} addToCart function to add the item to the cart
 */
const MenuItemComponent = ({ menuItem , addToCart }: Props) => {
  return (
    <Card className="cursor-pointer" onClick={addToCart}>
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        DZD {(menuItem.price).toFixed(2)}
      </CardContent>
    </Card>
  );
};

export default MenuItemComponent;
