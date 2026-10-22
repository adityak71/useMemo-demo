# Product Sum Calculator — React `useMemo` Notes

## 1. Project Overview

A simple React application that displays a list of products and calculates their total price.

The main purpose of this project is to understand the React `useMemo` Hook and how memoization can avoid unnecessary recalculations when a component re-renders.

## 2. Tech Stack

- React.js
- Vite
- JavaScript (ES6+)
- Tailwind CSS
- React Hooks: `useState`, `useMemo`

## 3. Project Structure

```text
src/
├── components/
│   └── Products.jsx
├── data/
│   └── products.js
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

### File Responsibilities

- `data/products.js` — Stores the product data.
- `components/Products.jsx` — Reusable component that displays an individual product.
- `App.jsx` — Manages the counter, calculates the total price, and renders the product list.
- `index.css` — Contains global styles and Tailwind CSS imports.
- `main.jsx` — Entry point of the React application.

## 4. Important React Concepts

### A. `useState`

`useState` is a React Hook used to manage state in a functional component.

**Syntax:**

```jsx
const [count, setCount] = useState(0);
```

- `count` — Current state value.
- `setCount` — Function used to update the state.
- `0` — Initial state value.

When the state changes, React schedules a re-render.

**Example:**

```jsx
const [count, setCount] = useState(0);

<button onClick={() => setCount(c => c + 1)}>
  Increment
</button>
```

### B. What Is a Re-render?

A re-render means React executes the component again to calculate its updated UI.

When the counter changes, the `App` component re-renders. Without memoization, calculations written directly in the component body execute again.

### C. What Is `useMemo`?

`useMemo` is a React Hook that caches the result of a calculation between renders.

**Syntax:**

```jsx
const memoizedValue = useMemo(() => {
  return calculation();
}, [dependencies]);
```

**How it works:**

1. React executes the calculation when the component initially renders.
2. React stores the calculated result.
3. On subsequent renders, React compares the dependencies.
4. If the dependencies have not changed, React can reuse the cached result.
5. If a dependency changes, React recalculates the result.

Memoization is a performance optimization, not a guarantee that a calculation will execute exactly once.

## 5. Calculating the Total Product Price

### Without `useMemo`

```jsx
const totalSum = products.reduce((sum, prod) => {
  return sum + prod.price;
}, 0);
```

This calculation runs whenever the component renders.

### With `useMemo`

```jsx
const totalSum = useMemo(() => {
  console.log("Calculating total...");

  return products.reduce((sum, prod) => {
    return sum + prod.price;
  }, 0);
}, []);
```

In this project, `products` is imported from a separate module and remains unchanged. Therefore, an empty dependency array is suitable for this fixed dataset.

The cached total can be reused when the counter changes.

## 6. Dependency Array Notes

The dependency array determines when React needs to recalculate a memoized value.

### Empty dependency array

```jsx
useMemo(() => calculateTotal(), []);
```

The calculation is memoized without reactive dependencies. React can reuse the result on later renders.

### Dependency array with values

```jsx
useMemo(() => price * quantity, [price, quantity]);
```

The calculation is repeated when `price` or `quantity` changes.

### Important Rule

Dependencies should include the reactive values used by the calculation.

Imported module-level values such as `products` are not reactive dependencies. If the imported array is mutated, that mutation alone will not trigger a React re-render.

If products need to be added, removed, or updated dynamically, store them in React state and use `[products]` as the dependency.

## 7. Why Is the Counter Used?

The counter is included to demonstrate the difference between a component re-render and a memoized calculation.

**Execution flow:**

1. The component renders.
2. The total price is calculated.
3. The counter button is clicked.
4. The counter state changes.
5. The component re-renders.
6. The memoized total is reused because its dependencies have not changed.

**Key takeaway:** A component can re-render without every memoized calculation running again.

## 8. `reduce()` Method

The JavaScript `reduce()` method processes array elements to produce a single result.

**Example:**

```jsx
const prices = [100, 200, 300];

const total = prices.reduce((sum, price) => {
  return sum + price;
}, 0);

console.log(total); // 600
```

- `sum` — Accumulated result.
- `price` — Current array element.
- `0` — Initial accumulator value.

## 9. Reusable Product Component

The `Products.jsx` component receives an individual product through props.

```jsx
const Products = ({ product }) => {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: ₹{product.price}</p>
      <p>Category: {product.category}</p>
    </div>
  );
};

export default Products;
```

The component can be reused for every product using `.map()`.

```jsx
{products.map((prod) => (
  <Products product={prod} key={prod.id} />
))}
```

The `key` prop helps React identify list elements during updates.

## 10. Important Difference: `useState` vs `useMemo`

| `useState` | `useMemo` |
|---|---|
| Stores component state | Caches a calculated result |
| State setter requests an update | Does not independently trigger a re-render |
| Used for counters and user input | Used for expensive calculations |
| State changes can trigger rendering | Dependencies determine when recalculation is needed |

## 11. Common Mistakes

- Using `useMemo` for every small calculation.
- Assuming `useMemo` prevents the entire component from re-rendering.
- Using unrelated dependencies merely to force recalculation.
- Mutating arrays stored in state instead of creating new arrays.
- Forgetting that development Strict Mode may execute calculations more than once.
- Using an empty dependency array when the calculation actually depends on changing reactive values.

## 12. Interview Revision

**Q1. What is `useMemo`?**

A React Hook that caches a calculation result between renders.

**Q2. Does `useMemo` prevent re-renders?**

No. It optimizes a calculation; it does not prevent the component from re-rendering.

**Q3. What is memoization?**

Memoization is an optimization technique that stores the result of a calculation and reuses it when the inputs remain unchanged.

**Q4. Why is `useMemo` used in this project?**

To demonstrate that the total price can be reused when unrelated state, such as the counter, changes.

**Q5. When should `useMemo` be used?**

When a calculation is expensive enough that avoiding repeated work is worthwhile, or when stable calculated values help optimize memoized child components.

## 13. Learning Outcome

After completing this project, you should understand:

- React state and re-rendering.
- The purpose of `useMemo`.
- Dependency array semantics.
- JavaScript's `reduce()` method.
- Reusable React components and props.
- The difference between component rendering and recalculating a memoized value.
