export function calculateProductPrice(product, selectedAttributes) {
    let basePrice = product.price;  // The base price of the product
  
    // Check if selectedAttributes contains variations (e.g., size, color)
    selectedAttributes.forEach(attribute => {
      const { size, color } = attribute;
  
      // Find the price for the specific size and color
      const variant = product.attributes.find(attr => attr.size === size && attr.color === color);
      
      if (variant) {
        // Add the price variation (if any)
        basePrice = variant.price;
      } else {
        // If no matching variant is found, return an error or handle as necessary
        throw new Error(`Price variation not found for size: ${size}, color: ${color}`);
      }
    });
  
    return basePrice;
  }
  
  export function calculateTotalPrice(productList) {
    let totalPrice = 0;
  
    productList.forEach(item => {
      const { product, selectedAttributes, quantity } = item;
      const productPrice = calculateProductPrice(product, selectedAttributes);
      
      // Calculate total price for this item
      totalPrice += productPrice * quantity;
    });
  
    return totalPrice;
  }
  