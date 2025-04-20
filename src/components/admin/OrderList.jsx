import { List, ListItem, ListItemText, Typography } from '@mui/material';

function OrderList({ orders }) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Lista de Pedidos
      </Typography>
      <List>
        {orders.map((order) => (
          <ListItem key={order.id}>
            <ListItemText
              primary={`Pedido #${order.id} - Total: $${order.total.toFixed(2)}`}
              secondary={`Usuario: ${order.userId} | Estado: ${order.status}`}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default OrderList;