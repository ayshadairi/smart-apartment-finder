import { addApartment } from "@/app/actions";

export default function NewApartment() {
    return (
        <form action={addApartment}>
            <input type="text" name="title" placeholder="Title" />
            <input type="text" name="price" placeholder="Price" />
            <input type="text" name="location" placeholder="Location" />
            <input type="number" name="bedrooms" placeholder="Bedrooms" />
            <textarea name="description" placeholder="Description"></textarea>
            <button type="submit">Add Apartment</button>
        </form>
    );
}