from app.models.garment import Garment
from app import db

def create_garment(name, phone_number, address):
    new_garment = Garment(name=name, phone_number=phone_number, address=address)
    db.session.add(new_garment)
    db.session.commit()
    return new_garment

def search_garment_by_id(name):
    return Garment.query.filter(Garment.name.ilike(f"%{name}%")).all()

def search_garment_by_phone(phone):
    return Garment.query.filter_by(phone_number=phone).first()

def update_garment(garment_id, updated_data):
    garment = garment.query.get(garment_id)
    if not garment:
        return None
    
    for key, value in updated_data.items():
        setattr(garment, key, value)
    db.session.commit()
    return garment
def delete_garment(garment_id):
    garment = garment.query.get(garment_id)
    if not garment:
        return None
    
    db.session.delete(garment)
    db.session.commit()
    return garment

def get_garments():
    garments = Garment.query.filter(Garment).all()
    if not garments:
        return None
    return garments