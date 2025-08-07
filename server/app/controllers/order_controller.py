from app.database.db import db
from app.models.order import Order
from app.models.garment import Garment
from app.models.service import Service
from app.models.order_detail import OrderDetail
from app.models.client import Client
from app.models.user import User

def create_order(client_id, user_id, estimated_date, total_price):
    order = Order(client_id=client_id, user_id=user_id, estimated_delivery_date=estimated_date, total=total_price)
    db.session.add(order)
    db.session.commit()
    return order

def add_garment_to_order(order_id, garment_type, description, notes):
    garment = Garment(order_=order_id, type=type, description=description, observations=notes)
    db.session.add(garment)
    db.session.commit()
    return garment

def create_order_detail(order_id, garment_id, service_id, quantity):
    order_detail = OrderDetail(garment_id=garment_id, service_id=service_id, quantity=quantity)
    db.session.add(order_detail)
    db.session.commit()
    return order_detail

def get_order_detail(order_id):
    order = Order.query.get(order_id)
    print("**********ORDEN**********", order.to_dict())
    order_data = {
        "order_id":order.id,
        "client":order.client.name,
        "status":order.state,
        "garments":[]
    }
    garments = Garment.query.filter_by(order_id=order.id)

    for garment in garments:
        print("*********GARMENT***********", garment.to_dict())
        garment_data = {
            "type":garment.type,
            "descriprion": garment.description,
            "observations": garment.observations,
            "services": []
        }
        for gs in garment.order.detail:
            service = Service.query.get(gs.service_id)
            print("*********SERVICE***********", gs.to_dict())
            service_data = {
                "name": service.name,
                "description": service.description,
                "price": service.price
            }
            garment_data["services"].append(service_data)
        order_data["garments"].append(garment_data)
    return order_data

def update_order_status(order_id, new_status):
    order = Order.query.get(order_id)
    if not order:
        return None
    order.state = new_status
    db.session.commit()
    return order

def list_orders_by_status(status):
    orders = Order.query.filter_by(state=status).all()
    data = [{
        "id":order.id,
        "client_id":order.client_id,
        "state":order.state,
        "estimated_delivery_date":order.estimated_delivery_date,
        "total":order.total,
        "pagado":order.pagado,
    } for order in orders]
    return data

def create_order_table(orders):
    data = []
    for order in orders:
        client = Client.query.get(order.client_id)
        user = User.query.get(order.user_id)
        order_table = {
            "id": order.id,
            "client_name": client.name if client else "Unknown",
            "user_name": user.name if user else "Unknown",
            "state": order.state,
            "created_at": order.created_at,
            "total": order.total,
        }
        data.append(order_table)
    return data

def get_orders_dashboard(pagination):
    orders = Order.query.filter().order_by(Order.created_at.desc()).limit(10)
    if pagination > 1:
        orders = orders.offset(pagination*10)
        return create_order_table(orders.all())

def get_pending_order_dashboard(pagination):
    orders_received = Order.query.filter_by(state="recibido").order_by(Order.created_at.desc()).limit(10)
    orders_process = Order.query.filter_by(state="en proceso").order_by(Order.created_at.desc()).limit(10)
    if pagination > 1:
        orders_process = orders_process + orders_received.offset(pagination*10)
        orders_received = orders_process + orders_received.offset(pagination*10)
    orders = orders_process.all() + orders_received.all()
    return create_order_table(orders)

def get_counting():
    num_garments = Garment.query.filter(Garment).count()
    num_services = Service.query.filter(Service).count()
    num_clients = Client.query.filter(Client).count()
    num_users = User.query.filter(User).count()
    data = {
        "quantity_garments": num_garments,
        "quantity_services": num_services,
        "quantity_clients": num_clients,
        "quantity_users": num_users
    }
    return data
