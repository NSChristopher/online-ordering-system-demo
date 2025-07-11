# Customer-Facing Frontend UX Layout

_This document provides a structured, annotated layout for the customer-facing frontend, using only features compatible with our current user stories and database schema. All flows support guest ordering, no authentication, and a single business._

---

## 1. Home/Menu Screen

```
---------------------------------------------------------------
| [Business Logo]        [Open/Closed Status]   [Hours]       |
---------------------------------------------------------------
| [Category Chips/Buttons: Appetizers | Mains | Drinks | ...] |
---------------------------------------------------------------
| [Search Bar]                                              |
---------------------------------------------------------------
| [Menu Item Card]   [Menu Item Card]   [Menu Item Card]     |
|  [Image]               [Image]             [Image]         |
|  [Name]                [Name]              [Name]          |
|  [Price]               [Price]             [Price]         |
|  [Short Desc]          [Short Desc]        [Short Desc]    |
|  [Add Button]          [Add Button]        [Add Button]    |
---------------------------------------------------------------
| ... more items ...                                        |
---------------------------------------------------------------
| [Persistent Cart Bar: 2 Items - $18.00 ▷] (always visible) |
---------------------------------------------------------------
```
**Notes:**
- Category chips filter visible items instantly.
- Menu items are shown as large, visual cards; tapping an item expands details in a modal/bottom-sheet.
- Cart bar is always visible at the bottom; tapping it opens the cart.

---

## 2. Menu Item Detail (Modal/Bottom Sheet)

```
---------------------------------------------------------------
| [Large Item Image]                                         |
| [Item Name]       [$Price]                                 |
| [Full Description]                                         |
| [Quantity Selector: – 1 + ]    [Add to Cart]               |
| [Close / Back]                                             |
---------------------------------------------------------------
```
**Notes:**
- Opens when a menu item is tapped.
- Allows viewing details and adding multiple quantities.
- No login or account needed.

---

## 3. Cart Drawer/Modal

```
---------------------------------------------------------------
| [Cart Title: Your Order]                                   |
| [Cart Item]   [Qty Selector]   [Price]   [Remove]          |
| [Cart Item]   [Qty Selector]   [Price]   [Remove]          |
| ---------------------------------------------------------  |
| [Subtotal]                                    [$Amount]     |
| [Order Type: To-Go / Delivery]   [Edit]                    |
| [Checkout Button ▷]                                       |
| [Close / Back]                                             |
---------------------------------------------------------------
```
**Notes:**
- Edit quantities and remove items inline.
- Select or edit order type (toggles between to-go and delivery).
- "Checkout" leads to the checkout screen.

---

## 4. Checkout Screen

```
---------------------------------------------------------------
| [Checkout Title]                                           |
| [Order Summary] (collapsible)                              |
| [Order Type Selector: To-Go | Delivery]                    |
| [If Delivery: Address Input Field]                         |
| [Name Input Field]                                         |
| [Phone Input Field]                                        |
| [Payment Method: Cash | Card (stub)]                       |
| [Place Order Button]                                       |
| [Cancel/Back]                                              |
---------------------------------------------------------------
```
**Notes:**
- Minimal fields, all required inline validation.
- No login, just info for the current order.
- On submission, the order is created and moves to the grace period screen.

---

## 5. Order Placed + Grace Period Screen

```
---------------------------------------------------------------
| [Order Placed! 🎉]                                         |
| [Order Summary]                                            |
| [Grace Period Timer: 4:59 ⏳ Edit/Cancel Available]         |
| [Edit Order] [Cancel Order]                                |
| [Progress Bar: Grace Period]                               |
| [Note: "You have 5 minutes to edit or cancel your order."] |
---------------------------------------------------------------
```
**Notes:**
- Shows a countdown timer visually.
- Edit returns to cart for changes; Cancel marks order as cancelled.
- After timer expires, Edit/Cancel is disabled, and status updates appear.

---

## 6. Order Status Screen

```
---------------------------------------------------------------
| [Order Status: Preparing 🥘]                               |
| [Order Summary]                                            |
| [Estimated Time/Ready Time]                                |
| [Live Status Bar: "Order received" → "Preparing"...]       |
| [Need Help? Contact Us]                                    |
---------------------------------------------------------------
```
**Notes:**
- Progress/status updates reflect real-time order state.
- "Need Help?" opens a modal with contact info (no login required).
- Friendly microcopy and icons for states.

---

## 7. Error & Empty States

- **Empty Menu:**  
  "Sorry, the menu is currently unavailable. Please check back soon."
- **Checkout Error:**  
  Inline validation for missing fields, with friendly prompts:  
  "Please enter your name to continue."
- **Order Cancelled:**  
  "Your order has been cancelled. If you need further help, contact us."

---

## General UI/UX Notes

- All buttons are large, thumb-friendly, and have visible feedback.
- Animations for actions: adding to cart, placing order, editing, etc.
- Color palette and typography are modern and accessible.
- All flows are mobile-first but scale to desktop.
- No authentication, login, or account-related elements present anywhere.

---

_This layout is ready for wireframing and component breakdown. All features are compatible with the current user stories and schema._