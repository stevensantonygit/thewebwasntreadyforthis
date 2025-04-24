document.addEventListener('DOMContentLoaded', function() {
    const initialProducts = [
      {
        id: 1,
        name: "Invisible Headphones",
        price: 99.99,
        emoji: "🎧",
        inStock: true
      },
      {
        id: 2,
        name: "Quantum Pocket Watch That Shows Different Times Simultaneously",
        price: 149.95,
        emoji: "⏱️",
        inStock: true
      },
      {
        id: 3,
        name: "Self-Inflating Self-Deflating Balloon",
        price: 12.50,
        emoji: "🎈",
        inStock: false
      },
      {
        id: 4,
        name: "WiFi-Enabled Analog Pencil",
        price: 24.99,
        emoji: "✏️",
        inStock: true
      },
      {
        id: 5,
        name: "Memory Foam That Forgets",
        price: 79.50,
        emoji: "🛏️",
        inStock: true
      },
      {
        id: 6,
        name: "Waterproof Sponge",
        price: 8.99,
        emoji: "🧽",
        inStock: true
      },
      {
        id: 7,
        name: "Silent Alarm Clock",
        price: 34.95,
        emoji: "⏰",
        inStock: true
      },
      {
        id: 8,
        name: "Dehydrated Water (Just Add Water)",
        price: 5.99,
        emoji: "💧",
        inStock: false
      }
    ];
    
    let products = [...initialProducts];
    let cartItems = [];
    let productIdCounter = products.length + 1;
    
    const productsContainer = document.getElementById('products-container');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartNotification = document.getElementById('cart-notification');
    const checkoutBtn = document.getElementById('checkout-btn');
    const errorPage = document.getElementById('error-page');
    const backToShopBtn = document.getElementById('back-to-shop');
    const createProductBtn = document.getElementById('create-product-btn');
    const customNameInput = document.getElementById('custom-name');
    const customPriceInput = document.getElementById('custom-price');
    
    renderProducts();
    renderCart();
    
    function renderProducts() {
      productsContainer.innerHTML = '';
      
      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
          <div class="product-image">${product.emoji}</div>
          <h3 class="product-name">${product.name}</h3>
          <div class="product-price" data-id="${product.id}">$${product.price.toFixed(2)}</div>
          <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
          <div class="product-notification" id="notification-${product.id}">Added to Cart!</div>
          ${product.inStock ? '' : '<div class="out-of-stock">OUT OF STOCK</div>'}
        `;
        
        productsContainer.appendChild(productCard);
        
        const addToCartBtn = productCard.querySelector('.add-to-cart');
        addToCartBtn.addEventListener('click', () => {
          if (product.inStock) {
            addToCart(product);
            showNotification(product.id);
          }
        });
      });
    }
    
    function renderCart() {
      if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<div class="status-message">Your cart is empty... for now.</div>';
        cartTotalElement.textContent = '$0.00';
        return;
      }
      
      cartItemsContainer.innerHTML = '';
      let total = 0;
      
      cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
          <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          </div>
          <button class="remove-item" data-id="${item.id}">×</button>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
        total += item.price;
        
        const removeBtn = cartItemElement.querySelector('.remove-item');
        removeBtn.addEventListener('click', () => {
          removeFromCart(item.id);
        });
      });
      
      cartTotalElement.textContent = `$${total.toFixed(2)}`;
    }

    function addToCart(product) {
      const randomizedPrice = randomizePrice(product.price);
      const modifiedProduct = { ...product, price: randomizedPrice };
      cartItems.push(modifiedProduct);
      
      renderCart();
      
      showGlobalNotification(`Added "${product.name}" to cart for $${randomizedPrice.toFixed(2)}`);

      if (Math.random() < 0.3) {
        setTimeout(() => {
          addPhantomItem();
        }, Math.random() * 5000 + 2000);
      }
      
      if (cartItems.length > 1 && Math.random() < 0.2) {
        setTimeout(() => {
          removeRandomItem();
        }, Math.random() * 8000 + 5000);
      }
    }
    
    function removeFromCart(productId) {
      cartItems = cartItems.filter(item => item.id !== productId);
      renderCart();
      
      showGlobalNotification(`Removed item from cart`);
    }
    
    function addPhantomItem() {
      const phantomNames = [
        "Schrödinger's Snack Box",
        "Digital Air Freshener",
        "Cloud Storage (Literal Cloud)",
        "Holographic Paperweight",
        "Quantum Entangled Socks (Single)",
        "Virtual Reality Contact Lenses",
        "AI-Generated Breakfast Cereal",
        "Noise-Cancelling Silence"
      ];
      
      const phantomItem = {
        id: Date.now(),
        name: phantomNames[Math.floor(Math.random() * phantomNames.length)],
        price: parseFloat((Math.random() * 100 + 5).toFixed(2)),
        emoji: "👻"
      };
      
      cartItems.push(phantomItem);
      renderCart();
      
      showGlobalNotification(`A wild "${phantomItem.name}" appeared in your cart!`, 'error');
    }
    
    function removeRandomItem() {
      if (cartItems.length === 0) return;
      
      const randomIndex = Math.floor(Math.random() * cartItems.length);
      const removedItem = cartItems[randomIndex];
      
      cartItems.splice(randomIndex, 1);
      renderCart();
      
      showGlobalNotification(`"${removedItem.name}" mysteriously vanished from your cart!`, 'error');
    }
    
    function randomizePrice(originalPrice) {
      const factor = 0.8 + Math.random() * 0.4;
      return parseFloat((originalPrice * factor).toFixed(2));
    }
    
    function showNotification(productId) {
      const notification = document.getElementById(`notification-${productId}`);
      notification.classList.add('show');
      
      setTimeout(() => {
        notification.classList.remove('show');
      }, 2000);
    }
    
    function showGlobalNotification(message, type = 'success') {
      cartNotification.innerHTML = message;
      cartNotification.className = `cart-notification show ${type === 'error' ? 'shake' : ''}`;
      
      setTimeout(() => {
        cartNotification.classList.remove('show');
      }, 3000);
    }
    
    function fluctuatePrices() {
      products.forEach(product => {
        if (Math.random() < 0.3) {
          const priceElement = document.querySelector(`.product-price[data-id="${product.id}"]`);
          if (priceElement) {
            const newPrice = randomizePrice(product.price);
            product.price = newPrice;
            priceElement.textContent = `$${newPrice.toFixed(2)}`;
            priceElement.classList.add('price-change');
            
            setTimeout(() => {
              priceElement.classList.remove('price-change');
            }, 500);
          }
        }
      });
    }
    
    function fluctuateAvailability() {
      products.forEach(product => {
        if (Math.random() < 0.15) {
          product.inStock = !product.inStock;
        }
      });
      
      renderProducts();
    }
    
    checkoutBtn.addEventListener('click', () => {
      errorPage.style.display = 'flex';
    });
    
    backToShopBtn.addEventListener('click', () => {
      errorPage.style.display = 'none';
      
      cartItems = [];
      renderCart();
      
      showGlobalNotification(`Your cart has been cleared due to phantom items!`, 'error');
    });
    
    createProductBtn.addEventListener('click', () => {
      const customName = customNameInput.value.trim();
      const customPrice = parseFloat(customPriceInput.value);
      
      if (customName && !isNaN(customPrice) && customPrice > 0) {
        const emojis = ["🎁", "🛍️", "📦", "🧸", "📱", "⌚", "💍", "👕", "👗", "👠", "🧢", "🔮", "📚", "🖼️"];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        const newProduct = {
          id: productIdCounter++,
          name: customName,
          price: customPrice,
          emoji: randomEmoji,
          inStock: Math.random() < 0.8
        };
        
        products.push(newProduct);
        renderProducts();
        
        customNameInput.value = '';
        customPriceInput.value = '';
        
        showGlobalNotification(`Created new product: "${customName}"`, 'success');
      } else {
        showGlobalNotification('Please enter a valid name and price!', 'error');
      }
    });
    
    setInterval(fluctuatePrices, 5000);
    setInterval(fluctuateAvailability, 15000);
    
    setInterval(() => {
      if (Math.random() < 0.2) {
        const availableProducts = products.filter(p => p.inStock);
        if (availableProducts.length > 0) {
          const randomProduct = availableProducts[Math.floor(Math.random() * availableProducts.length)];
          if (!cartItems.some(item => item.id === randomProduct.id)) {
            addToCart(randomProduct);
          }
        }
      }
    }, 20000);
    
    setInterval(() => {
      if (cartItems.length > 0 && Math.random() < 0.3) {
        const randomIndex = Math.floor(Math.random() * cartItems.length);
        const originalPrice = cartItems[randomIndex].price;
        const newPrice = randomizePrice(originalPrice);
        
        cartItems[randomIndex].price = newPrice;
        renderCart();
        
        showGlobalNotification(`Price of "${cartItems[randomIndex].name}" changed from $${originalPrice.toFixed(2)} to $${newPrice.toFixed(2)}`, 'error');
      }
  }, 10000);
    const checkoutButton = document.getElementById('checkout-btn');
    
    checkoutButton.addEventListener('mouseover', (e) => {
      if (Math.random() < 0.4) {
        const buttonWidth = checkoutButton.offsetWidth;
        const buttonHeight = checkoutButton.offsetHeight;
        const containerWidth = checkoutButton.parentElement.offsetWidth;
        
        const maxX = containerWidth - buttonWidth;
        const newX = Math.random() * maxX;
        
        checkoutButton.style.transform = `translateX(${newX - buttonWidth/2}px)`;
        checkoutButton.classList.add('fading');
        
        setTimeout(() => {
          checkoutButton.style.transform = '';
          checkoutButton.classList.remove('fading');
        }, 1000);
        
        showGlobalNotification("Oops! The checkout button is feeling shy!", 'error');
      }
    });
    
    function addRandomTags() {
      document.querySelectorAll('.product-card').forEach(card => {
        const existingTag = card.querySelector('.product-tag');
        if (existingTag) existingTag.remove();
        
        if (Math.random() < 0.3) {
          const tags = [
            "Best Seller!",
            "New Arrival!",
            "Limited Edition!",
            "Almost Gone!",
            "Sale!",
            "Exclusive!",
            "Trending!",
            "Last One!",
            "As Seen On TV!",
            "Back In Stock!"
          ];
          
          const randomTag = tags[Math.floor(Math.random() * tags.length)];
          const tagElement = document.createElement('div');
          tagElement.className = 'product-tag';
          tagElement.textContent = randomTag;
          card.appendChild(tagElement);
        }
      });
    }

    function addRandomShimmers() {
      document.querySelectorAll('.product-card').forEach(card => {
        card.classList.remove('shimmer');
        
        if (Math.random() < 0.2) {
          card.classList.add('shimmer');
        }
      });
    }
    
    function swapRandomProducts() {
      if (products.length < 2) return;
      
      const index1 = Math.floor(Math.random() * products.length);
      let index2 = Math.floor(Math.random() * products.length);
      
      while (index1 === index2) {
        index2 = Math.floor(Math.random() * products.length);
      }
      
      [products[index1], products[index2]] = [products[index2], products[index1]];
      
      renderProducts();
      
      showGlobalNotification("Products just rearranged themselves!", 'success');
    }
    
    function replaceRandomProduct() {
      if (products.length === 0) return;
      
      const phantomProducts = [
        {
          name: "Time Travel Ticket (One Way)",
          price: 999.99,
          emoji: "🕰️"
        },
        {
          name: "Weight-Adding Diet Pills",
          price: 45.50,
          emoji: "💊"
        },
        {
          name: "Underwater Hair Dryer",
          price: 29.99,
          emoji: "💧"
        },
        {
          name: "Solar-Powered Flashlight for Night Use",
          price: 19.95,
          emoji: "🔦"
        },
        {
          name: "Pet Rock (Needs Feeding)",
          price: 7.99,
          emoji: "🪨"
        },
        {
          name: "DIY Brain Surgery Kit",
          price: 299.99,
          emoji: "🧠"
        },
        {
          name: "Gravity-Free Water Bottle",
          price: 35.50,
          emoji: "🧪"
        },
        {
          name: "Fireproof Matches",
          price: 4.99,
          emoji: "🔥"
        }
      ];
      
      const randomIndex = Math.floor(Math.random() * products.length);
      const newProduct = phantomProducts[Math.floor(Math.random() * phantomProducts.length)];
      
      products[randomIndex] = {
        ...newProduct,
        id: productIdCounter++,
        inStock: Math.random() < 0.7
      };
      
      renderProducts();
    }
    
    function changeRandomEmoji() {
      if (products.length === 0) return;
      
      const randomIndex = Math.floor(Math.random() * products.length);
      const emojis = ["🎁", "🛍️", "📦", "🧸", "📱", "⌚", "💍", "👕", "👗", "👠", "🧢", "🔮", "📚", "🖼️", "🎭", "🎨", "🎮", "🎯", "🎣", "🎸", "🎺", "🎪", "🩸", "👻", "👽", "🤖", "💩", "🦄", "🦖"];
      
      const oldEmoji = products[randomIndex].emoji;
      const newEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      
      products[randomIndex].emoji = newEmoji;
      
      const productElements = document.querySelectorAll('.product-card');
      if (productElements[randomIndex]) {
        const imageElement = productElements[randomIndex].querySelector('.product-image');
        if (imageElement) {
          imageElement.textContent = newEmoji;
          imageElement.classList.add('shake');
          
          setTimeout(() => {
            imageElement.classList.remove('shake');
          }, 500);
        }
      }
    }
    
    function createFakeLoadingState() {
      const loadingMessage = document.createElement('div');
      loadingMessage.className = 'status-message';
      loadingMessage.textContent = 'Loading products...';
      
      productsContainer.innerHTML = '';
      productsContainer.appendChild(loadingMessage);
      
      setTimeout(() => {
        renderProducts();
      }, 1500);
    }
    
    function showFakeError() {
      const errorMessages = [
        "Error: Products failed to materialize",
        "Connection to imaginary warehouse lost",
        "Product database temporarily in another dimension",
        "The shopping cart is questioning its existence",
        "Items are experiencing an identity crisis",
        "Error 418: I'm a teapot"
      ];
      
      const randomMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
      const errorElement = document.createElement('div');
      errorElement.className = 'status-message error shake';
      errorElement.textContent = randomMessage;
      
      if (Math.random() < 0.5) {
        productsContainer.insertBefore(errorElement, productsContainer.firstChild);
      } else {
        cartItemsContainer.insertBefore(errorElement, cartItemsContainer.firstChild);
      }
      
      setTimeout(() => {
        errorElement.remove();
      }, 3000);
    }
    
    function changeCurrencySymbol() {
      const currencies = ['$', '€', '£', '¥', '₹', '₽', '₿', '🪙'];
      const randomCurrency = currencies[Math.floor(Math.random() * currencies.length)];
      
      document.querySelectorAll('.product-price').forEach(priceElem => {
        const currentPrice = priceElem.textContent;
        const numberOnly = parseFloat(currentPrice.replace(/[^0-9.-]+/g, ""));
        priceElem.textContent = `${randomCurrency}${numberOnly.toFixed(2)}`;
      });
      
      document.querySelectorAll('.cart-item-price').forEach(priceElem => {
        const currentPrice = priceElem.textContent;
        const numberOnly = parseFloat(currentPrice.replace(/[^0-9.-]+/g, ""));
        priceElem.textContent = `${randomCurrency}${numberOnly.toFixed(2)}`;
      });
      
      const currentTotal = cartTotalElement.textContent;
      const totalNumber = parseFloat(currentTotal.replace(/[^0-9.-]+/g, ""));
      cartTotalElement.textContent = `${randomCurrency}${totalNumber.toFixed(2)}`;
      
      showGlobalNotification(`Currency changed to ${randomCurrency}!`, 'success');
    }
    
    function changePageTitle() {
      const titles = [
        "The Phantom Shopping Cart - Items Not Guaranteed To Exist",
        "Buy Nothing, Get Something - Maybe",
        "404 Store: Products Not Found",
        "Schrödinger's Shop - Items May Or May Not Exist",
        "The Void Mart - Where Products Go To Disappear",
        "Quantum Shopping - Observe Your Cart To Collapse Its Wavefunction"
      ];
      
      document.title = titles[Math.floor(Math.random() * titles.length)];
    }
    
    setInterval(addRandomTags, 10000);
    setInterval(addRandomShimmers, 7000);
    setInterval(changeRandomEmoji, 12000);
    

    setInterval(swapRandomProducts, 30000);
    setInterval(replaceRandomProduct, 45000);
    setInterval(showFakeError, 40000);
    setInterval(createFakeLoadingState, 60000);
    setInterval(changeCurrencySymbol, 50000);
    setInterval(changePageTitle, 25000);
    
    function generateRandomCoupon() {
      const couponCodes = [
        "PHANTOM50", 
        "NOTREAL25", 
        "FAKECART",
        "IMAGINARY",
        "VOID100",
        "DOESNTWORK"
      ];
      
      const randomCode = couponCodes[Math.floor(Math.random() * couponCodes.length)];
      const discountPercent = Math.floor(Math.random() * 75) + 10;
      
      showGlobalNotification(`Special offer! Use code "${randomCode}" for ${discountPercent}% off! (Spoiler: It won't work)`, 'success');
      
      if (!document.getElementById('coupon-form')) {
        const couponForm = document.createElement('div');
        couponForm.id = 'coupon-form';
        couponForm.className = 'form-row';
        couponForm.innerHTML = `
          <input type="text" id="coupon-input" placeholder="Enter coupon code">
          <button class="create-btn" id="apply-coupon-btn">Apply</button>
        `;
        
        const cartContainer = document.querySelector('.cart-container');
        cartContainer.insertBefore(couponForm, document.getElementById('checkout-btn'));
        
        document.getElementById('apply-coupon-btn').addEventListener('click', () => {
          const inputValue = document.getElementById('coupon-input').value;
          
          if (inputValue.trim() !== '') {
            if (Math.random() < 0.9) {
              showGlobalNotification(`Coupon "${inputValue}" is invalid or has expired.`, 'error');
            } else {
              showGlobalNotification(`Coupon applied successfully! Discount: 0%`, 'success');
            }
            document.getElementById('coupon-input').value = '';
          }
        });
      }
    }
    
    setInterval(generateRandomCoupon, 35000);
    
    function addFakeChatSupport() {
      if (document.getElementById('chat-support')) return;
      
      const chatButton = document.createElement('div');
      chatButton.id = 'chat-support';
      chatButton.innerHTML = '💬 Chat Support';
      chatButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background-color: var(--secondary-color);
        color: white;
        padding: 10px 15px;
        border-radius: 50px;
        font-weight: bold;
        cursor: pointer;
        z-index: 100;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      `;
      
      document.body.appendChild(chatButton);
      
      chatButton.addEventListener('click', () => {
        showGlobalNotification("Connecting to support agent...", 'success');
        
        setTimeout(() => {
          showGlobalNotification("All our support agents are currently in another dimension. Please try again later.", 'error');
        }, 3000);
      });
    }
    
    setTimeout(addFakeChatSupport, 10000);
    
    function addShippingInfoForm() {
      if (document.getElementById('shipping-form')) return;
      
      const shippingSection = document.createElement('div');
      shippingSection.className = 'content-block';
      shippingSection.style.marginTop = '2rem';
      
      shippingSection.innerHTML = `
        <h3>Shipping Information</h3>
        <p>Please enter your details to calculate shipping costs (that will never arrive).</p>
        <form id="shipping-form">
          <div class="form-row">
            <label for="address">Address:</label>
            <input type="text" id="address" placeholder="Where should we not deliver to?">
          </div>
          <div class="form-row">
            <label for="city">City:</label>
            <input type="text" id="city" placeholder="Any city, real or imaginary">
          </div>
          <div class="form-row">
            <label for="shipping-method">Shipping Method:</label>
            <select id="shipping-method">
              <option value="standard">Standard (3-5 Business Days)</option>
              <option value="express">Express (1-2 Business Days)</option>
              <option value="teleport">Quantum Teleportation (Instantaneous)</option>
              <option value="snail">Snail Mail (3-6 Months)</option>
            </select>
          </div>
          <button type="submit" class="create-btn">Calculate Shipping</button>
        </form>
      `;
      
      const container = document.querySelector('.container');
      container.appendChild(shippingSection);
      
      document.getElementById('shipping-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        showGlobalNotification("Calculating shipping costs...", 'success');
        
        setTimeout(() => {
          if (Math.random() < 0.5) {
            showGlobalNotification("Sorry, we lost your address information. Please try again.", 'error');
            document.getElementById('address').value = '';
            document.getElementById('city').value = '';
          } else {
            const shippingCost = (Math.random() * 50 + 5).toFixed(2);
            showGlobalNotification(`Shipping calculated: $${shippingCost}`, 'success');
            
            setTimeout(() => {
              if (Math.random() < 0.7) {
                showGlobalNotification("Oops! We forgot to add shipping to your total.", 'error');
              }
            }, 3000);
          }
        }, 2000);
      });
    }
    
    setTimeout(addShippingInfoForm, 20000);
    
    function shuffleFormFields() {
      const forms = document.querySelectorAll('form');
      
      forms.forEach(form => {
        const formRows = Array.from(form.querySelectorAll('.form-row'));
        
        if (formRows.length > 1) {
          const shuffledRows = formRows.sort(() => Math.random() - 0.5);
          
          formRows.forEach(row => row.remove());
          shuffledRows.forEach(row => form.appendChild(row));
          
          showGlobalNotification("Form fields rearranged themselves!", 'error');
        }
      });
    }
    
    setInterval(shuffleFormFields, 55000);
  });