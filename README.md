# Guide for Developers Moving from JavaScript to TypeScript

## Introduction
TypeScript is a superset of JavaScript that introduces static typing and additional features to improve code reliability and developer productivity. This guide is designed to help JavaScript developers transition smoothly to TypeScript. It now includes detailed examples and practical code insights based on real-world scenarios.

---

## 1. **Why TypeScript?**

### Benefits of TypeScript:
- **Static Typing:** Catch type-related errors at compile time.
- **Enhanced Tooling:** Better autocomplete, refactoring tools, and documentation support.
- **Improved Maintainability:** Clearly defined types make code easier to read and understand.
- **Supports Modern JavaScript:** Compatible with ES6+ features, including modules, classes, and async/await.
- **Large Ecosystem Support:** Works seamlessly with popular libraries and frameworks like React, Angular, and Node.js.

---

## 2. **Key Differences Between JavaScript and TypeScript**

### TypeScript Features Not in JavaScript:
1. **Static Typing**
    ```typescript
    let age: number = 30; // Variable explicitly typed as a number
    let name: string = "John";
    ```

2. **Interfaces**
    ```typescript
    interface User {
        id: number;
        name: string;
        isActive: boolean;
    }

    const user: User = {
        id: 1,
        name: "Alice",
        isActive: true
    };
    ```

3. **Enums**
    ```typescript
    enum Status {
        Active,
        Inactive,
        Pending
    }

    const currentStatus: Status = Status.Active;
    ```

4. **Generics**
    ```typescript
    function identity<T>(value: T): T {
        return value;
    }

    const result = identity<string>("Hello");
    ```

5. **Modules**
    - TypeScript uses ES6 module syntax with support for `import` and `export`.

---

## 3. **Setting Up TypeScript**

### Install TypeScript:
```bash
npm install -g typescript
```

### Initialize a TypeScript Project:
```bash
tsc --init
```
This generates a `tsconfig.json` file for configuring TypeScript.

### Compile TypeScript Code:
```bash
tsc index.ts
```
This compiles `index.ts` into `index.js`.

### Use with Node.js:
Install `ts-node` for running TypeScript files directly:
```bash
npm install -g ts-node
```

---

## 4. **Core TypeScript Concepts**

### Type Annotations
- Explicitly declare types for variables, function arguments, and return values.
    ```typescript
    function add(a: number, b: number): number {
        return a + b;
    }
    ```

### Type Inference
- TypeScript can infer types based on the assigned value.
    ```typescript
    let count = 10; // Inferred as number
    ```

### Union and Intersection Types
- **Union Type:** A variable can hold multiple types.
    ```typescript
    let value: number | string;
    value = 42;
    value = "Hello";
    ```

- **Intersection Type:** Combines multiple types.
    ```typescript
    interface Person {
        name: string;
    }

    interface Employee {
        employeeId: number;
    }

    type Worker = Person & Employee;

    const worker: Worker = {
        name: "Jane",
        employeeId: 123
    };
    ```

### Type Assertions
- Assert a value's type explicitly.
    ```typescript
    const someValue: any = "Hello, TypeScript!";
    const strLength: number = (someValue as string).length;
    ```

### Non-Null Assertion
- Use `!` to assert that a value is non-null or non-undefined.
    ```typescript
    const element = document.getElementById("app")!;
    ```

---

## 5. **Working with Existing JavaScript Code**

### Gradual Migration
- TypeScript allows incremental adoption. Start by renaming `.js` files to `.ts` and adding type annotations gradually.

### Use `@ts-ignore` for Temporary Bypasses
- Suppress errors for problematic lines during migration:
    ```typescript
    // @ts-ignore
    console.log(nonExistentVariable);
    ```

### Adding Type Declarations
- For third-party libraries, use `@types` packages:
    ```bash
    npm install --save-dev @types/lodash
    ```

### Type Declaration Files
- Declare types for custom JavaScript modules in `.d.ts` files:
    ```typescript
    declare module "my-library" {
        export function greet(name: string): string;
    }
    ```

---

## 6. **Advanced TypeScript Features**

### Utility Types
- Built-in types to simplify common tasks:
    ```typescript
    interface User {
        id: number;
        name: string;
        email?: string;
    }

    type PartialUser = Partial<User>; // All properties optional
    type ReadonlyUser = Readonly<User>; // All properties readonly
    ```

### Decorators
- Add metadata to classes and methods (requires `experimentalDecorators` in `tsconfig.json`):
    ```typescript
    function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(`Method ${propertyKey} was called`);
    }

    class Example {
        @Log
        greet() {
            console.log("Hello!");
        }
    }
    ```

### Custom Types
- Create reusable and composable types:
    ```typescript
    type ID = string | number;
    ```

### Never Type
- Use `never` to indicate a function that never returns (e.g., an error handler):
    ```typescript
    const errorHandler = (): never => {
        throw new Error("Something went wrong");
    };
    ```

---

## 7. **Classes in TypeScript**

### Example Class:
```typescript
class Player {
    public readonly id: string;
    constructor(
        private height: number,
        public weight: number,
        protected power: number
    ) {
        this.id = String(Math.random() * 100);
    }

    get getMyHeight(): number {
        return this.height;
    }

    set changeHeight(val: number) {
        this.height = val;
    }
}

const player = new Player(180, 75, 90);
console.log("Height:", player.getMyHeight);
player.changeHeight = 200;
console.log("New Height:", player.getMyHeight);
```

### Inheritance Example:
```typescript
class SpecialPlayer extends Player {
    constructor(height: number, weight: number, power: number, public special: boolean) {
        super(height, weight, power);
    }

    getPower(): number {
        return this.power;
    }
}

const specialPlayer = new SpecialPlayer(180, 75, 90, true);
console.log("Power:", specialPlayer.getPower());
```

---

## 8. **Type Utilities**

### Key Utilities:
- **Partial<Type>:** Makes all properties optional.
- **Required<Type>:** Makes all properties required.
- **Readonly<Type>:** Makes all properties readonly.
- **Record<Keys, Type>:** Maps keys to a type.
    ```typescript
    type User = {
        name: string;
        email: string;
    };

    type UserRecord = Record<"id" | "role", string>;

    const user: UserRecord = {
        id: "123",
        role: "admin"
    };
    ```
- **Pick<Type, Keys>:** Select specific properties from a type.
- **Omit<Type, Keys>:** Exclude specific properties from a type.
- **Exclude<Type, ExcludedUnion>:** Removes union members.
- **Extract<Type, Union>:** Keeps only union members.
- **NonNullable<Type>:** Removes `null` and `undefined`.

### Generics
```typescript
const filterByProperty = <T, K extends keyof T>(arr: T[], key: K, value: T[K]): T[] => {
    return arr.filter(item => item[key] === value);
};

const users = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 }
];

const filtered = filterByProperty(users, "age", 30);
console.log(filtered);
```

---

## 9. **Further Resources**

- [Official TypeScript Documentation](https://www.typescriptlang.org/docs/)

