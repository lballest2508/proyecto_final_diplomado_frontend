import { ListItem, ListItemText, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function CartItem({ item, updateQuantity, removeFromCart }) {
  return (
    <ListItem
      sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
    >
      <ListItemText
        primary={item.product.name}
        secondary={`$${item.product.price.toFixed(2)} x ${item.quantity} = $${(
          item.product.price * item.quantity
        ).toFixed(2)}`}
      />
      <TextField
        type="number"
        value={item.quantity}
        onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
        inputProps={{ min: 1 }}
        sx={{ width: 80 }}
      />
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={() => removeFromCart(item.product.id)}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}

export default CartItem;