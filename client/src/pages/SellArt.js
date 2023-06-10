import React from "react";
import { Link } from "react-router-dom";

function SellArt() {
  return (
    <>
      <div>
        <h3>What would you like to sell?</h3>
        <form>
          {/* {" "} */}
          <div class="form-group">
            <label for="title" class="h4">
              Title of Artwork:
            </label>
            <input class="rounded" type="text" id="title" />
          </div>





          <div class="form-group">
    <div class="row">
        <div class="col-md-12">
            <label for="description" class="h4">Description:</label>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <textarea class="form-control rounded" type="text" id="description" name="description" rows="3" cols="60"></textarea>
        </div>
    </div>
</div>
        </form>




      </div>
    </>
  );
}

export default SellArt;