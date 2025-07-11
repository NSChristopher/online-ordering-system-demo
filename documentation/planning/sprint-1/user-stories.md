# User Stories

---

## Customer-Facing Web App (Highly Mobile Friendly)

- **US-001:** 

  _Expanded Context:_
  > 

  - **Acceptance Criteria:**
    - [ ] Menu is categorized and easy to browse.

---

- **US-002:** As a customer, I want to select an order type (delivery or to-go) so that I can choose how I receive my food.

  _Expanded Context:_
  > Customers can choose between delivery or to-go at any point before checkout. The current selection is always visible and easy to change. If delivery is selected, prompt for address (stubbed for MVP). This step should be clear and unobtrusive within the ordering flow. At no point is a login or account creation required.

  - **Acceptance Criteria:**
    - [ ] Order type is selectable and persists through checkout.
    - [ ] Delivery requires address (simple input; not validated for MVP).
    - [ ] To-go requires no address input.
    - [ ] No login, registration, or account required.

---

- **US-003:** As a customer, I want to add menu items to a cart, review my selections, and make changes before checkout so that my order is accurate.

  _Expanded Context:_
  > The cart should be accessible from any screen, showing a summary of selected items, quantities, and total price. Customers can increment, decrement, or remove items before proceeding. The cart updates in real time and is persistent during the session. No user account or login is needed.

  - **Acceptance Criteria:**
    - [ ] Cart is always accessible.
    - [ ] Items can be added, removed, or quantity changed.
    - [ ] Cart updates total price in real time.
    - [ ] No login, registration, or account required.

---

- **US-004:** As a customer, I want to checkout quickly and choose to pay by cash or card (stubbed) so that the ordering experience is smooth and efficient.

  _Expanded Context:_
  > Checkout is a single, streamlined form with minimal required fields. Payment is simulated (no real processing for MVP). After checkout, show a clear order confirmation and summary. The UI must provide immediate feedback if there are missing required fields. Customers provide only their name, phone, and (if delivery) address—no login, password, or account.

  - **Acceptance Criteria:**
    - [ ] Checkout is simple and fast.
    - [ ] Payment method is selectable (cash/card, stubbed).
    - [ ] Confirmation screen with order summary is shown.
    - [ ] No login, registration, or account required.

---

## Worker Dashboard (Android Tablet Optimized)

- **US-005:** As a restaurant worker, I want to see incoming orders live, with clear status indicators, so that I can prioritize and manage orders efficiently.

  _Expanded Context:_
  > The dashboard displays all new and in-progress orders, updating automatically (real-time or frequent polling). Each order shows its details, status, and time since received. Visual cues (colors, icons) indicate new, accepted, or completed orders. Designed for fast scanning and touch interaction on tablets. No login or authentication is required for access in MVP.

  - **Acceptance Criteria:**
    - [ ] Orders appear in real time or near real time.
    - [ ] Status and order age are clearly visible.
    - [ ] UI is optimized for tablet touch interaction.
    - [ ] No login or authentication required.

---

- **US-006:** As a restaurant worker, I want to accept or reject orders and mark them as made/ready so that the kitchen and front-of-house can work efficiently.

  _Expanded Context:_
  > Each order card includes large, easy-to-tap buttons to accept, reject, or mark as made/ready. Actions update the order’s status immediately in the dashboard and for the customer. The interaction should minimize accidental taps and require minimal training. No authentication barrier is required.

  - **Acceptance Criteria:**
    - [ ] Orders can be accepted, rejected, or marked ready in one tap.
    - [ ] Status changes reflect instantly in the UI.
    - [ ] Touch targets are large and accessible.
    - [ ] No login or authentication required.

---

- **US-007:** As a restaurant worker, I want clear notifications for new or urgent orders so that I never miss a time-sensitive request.

  _Expanded Context:_
  > Visual or audible notifications highlight new orders and those that have been waiting too long. The notification system must not be disruptive, but should reliably draw attention. Designed for use in a noisy, fast-paced kitchen environment. No login required.

  - **Acceptance Criteria:**
    - [ ] New/urgent orders are clearly indicated.
    - [ ] Visual or audible cues are present on the dashboard.
    - [ ] No login or authentication required.

---

## Admin Portal (Web/Desktop Optimized)

- **US-008:** As a restaurant admin, I want to create, update, and delete menu categories and items so that the menu stays accurate and up-to-date.

  _Expanded Context:_
  > Admins can manage the full menu via a simple, modern web portal. Creating a new category or item is fast and intuitive, with input fields for name, description, price, and optional image. Changes are saved in real time and reflected instantly in the customer app. No authentication or login is required in MVP.

  - **Acceptance Criteria:**
    - [ ] CRUD operations for categories and items are available.
    - [ ] Menu changes propagate to customers instantly.
    - [ ] Admin UI is clear and easy to use for non-technical staff.
    - [ ] No login or authentication required.

---

- **US-009:** As a restaurant admin, I want to update business information (e.g., name, hours, address, phone) so that customers always see correct details.

  _Expanded Context:_
  > The admin portal includes a business info section with editable fields for all key restaurant details. Updates save instantly and reflect on the customer-facing app. The UI should validate input formats (e.g., phone number) where possible. No authentication or login required.

  - **Acceptance Criteria:**
    - [ ] All business info fields are editable.
    - [ ] Saved changes are live immediately.
    - [ ] Guidance and validation for key fields.
    - [ ] No login or authentication required.

---

## General / Shared

- **US-010:** As a user (any role), I want the interface to be visually modern, responsive, and fast so that my experience is enjoyable and efficient.

  _Expanded Context:_
  > All interfaces (customer, worker, admin) must follow modern design principles: clean layouts, accessible color and font choices, polished animations, and instant feedback. Performance and usability are top priorities. The UI adapts to each device’s main use case (mobile for customers, tablet for workers, desktop for admins), but degrades gracefully on others. All access is open in the MVP.

  - **Acceptance Criteria:**
    - [ ] All apps have a polished, modern look and feel.
    - [ ] Responsive layouts for target device classes.
    - [ ] Navigation and feedback are fast and intuitive.
    - [ ] No login or authentication required.

---

_Add further user stories as the project evolves.  
**Note: There is no customer, admin, or worker authentication, registration, or login in the MVP.**_