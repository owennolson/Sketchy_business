import React from "react";
import { useStoreContext } from '../utils/GlobalState';

function SellArt() {
    const [state, dispatch] = useStoreContext();

    const { categories } = state;

  return (
    <>
      <div>
        <h3>What would you like to sell?</h3>
        <form>
          {/* {" "} */}
          <div class="form-group">
            <label for="name" class="h4">
              Title of Artwork:
            </label>
            <input class="rounded" type="text" id="name" />
          </div>

          <div class="form-group">
            <label for="image" class="h4">
              Image URL:
            </label>
            <input class="rounded" type="text" id="image" />
          </div>

          <div class="form-group">
            <label for="artist" class="h4">
              Artist's Name:
            </label>
            <input class="rounded" type="text" id="artist" />
          </div>

          <div class="form-group">
            <label for="price" class="h4">
              Price:
            </label>
            <input class="rounded" type="text" id="price" />
          </div>

          <div class="form-group">
            <label for="quantity" class="h4">
              Quantity:
            </label>
            <input class="rounded" type="text" id="quantity" />
          </div>

          <div class="form-group">
            <div class="row">
              <div class="col-md-12">
                <label for="description" class="h4">
                  Description:
                </label>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <textarea
                  class="form-control rounded"
                  type="text"
                  id="description"
                  name="description"
                  rows="3"
                  cols="60"
                ></textarea>
              </div>
            </div>
            <div>
            <label for="category">Select Category</label>
                <select id="category" name="category">
                    {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                        {category.name}
                    </option>
                    ))}
                </select>
            </div>

          </div>
        </form>
      </div>
    </>
  );
}

export default SellArt;