from rest_framework.serializers import ModelSerializer, CharField
from .models import Property, Reservation


class PropertySerializer(ModelSerializer):
    
    class Meta:
        model = Property
        fields = [
            'description',
            'prop_type',
            'address',
            'rooms',
            'baths',
            'parking',
            'max_guests',
            'is_available',
            'first_day_available',
            'rate',
            'cover_image',
            'owner',
                ]
    def create(self, validated_data):
        # print(self.context['reqeust'].user)
        return super().create(validated_data)
    def get_cover_image(self, obj):
        if obj.cover_image:
            return self.context['request'].build_absolute_uri(obj.cover_image.url)
        return None

class ReservationSerializer(ModelSerializer):

    class Meta:
        model = Reservation
        fields = [
            'id',
            'check_in',
            'check_out',
            'num_days',
            'numGuests',
            'property_id',
            'customer',
            'owner',
            'status',
        ]
    
    def create(self, validated_data):
        return super().create(validated_data)
    


