from app.models.service import Service
from app import db

def create_service(name, phone_number, address):
    new_service = Service(name=name, phone_number=phone_number, address=address)
    db.session.add(new_service)
    db.session.commit()
    return new_service

def search_service_by_id(name):
    return Service.query.filter(Service.name.ilike(f"%{name}%")).all()

def search_service_by_phone(phone):
    return Service.query.filter_by(phone_number=phone).first()

def update_service(service_id, updated_data):
    service = service.query.get(service_id)
    if not service:
        return None
    
    for key, value in updated_data.items():
        setattr(service, key, value)
    db.session.commit()
    return service
def delete_service(service_id):
    service = service.query.get(service_id)
    if not service:
        return None
    
    db.session.delete(service)
    db.session.commit()
    return service

def get_services():
    services = Service.query.filter(Service).all()
    if not services:
        return None
    return services