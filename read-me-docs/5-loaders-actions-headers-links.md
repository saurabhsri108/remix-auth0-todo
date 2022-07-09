## Loaders, Actions, Headers, Links, LiveReload, Scripts

> [Back to README.md](../README.md)

### Loaders

This is for GET HTTP request. Anytime, you need to READ the data from the database, that can be done here.

```tsx
export let loaders: LoaderFunction = async ({ context, params, request }) => {
  let data = await _someORM.getData();
  // data modification to get the exact required format happens here because server is fast and in our control
  return data;
};

// used with client side useLoaderData();
```

### Actions

This is for POST (PUT, PATCH, DELETE) HTTP request. Anytime, you need to WRITE the data into the database, that can be done here. It utilizes the default data mutation abilities of the browser itself. HTTP FORMS is the key here with WEB FETCH API: Request, Response, URLSearchParams.

```tsx
export let action: ActionFunction = async ({ request }) => {
  let body = new URLSearchParams(await request.text());
  // or
  let formData = await request.formData();

  // validating data inputs
  let errors: Record<string, boolean> = {};
  if (!_somefield) errors._somefield = true;

  if (Object.keys(errors).length) return errors;

  await _someORM.create({
    data: {
      _someField: body.get('_someField')!,
    },
  });
  return redirect('/_samePageRoute'); // this prevents the form re-submission on click of back button
};

// used with client side useActionData();
```

### Scripts

This is when we want to include JS in our app. We add this to the **root.tsx** file inside the body as &lt;Script/&gt;

We can then replace &lt;form&gt; with &lt;Form&gt; from 'remix' package and it will be JS Form rather than plain HTML form. This makes remix incharge of our form rather than Browser. Hence, no fullpage reload. This should be combine with **Optimistic UI**

Parallel fetch requests are sent for a route URL in remix. Meaning, parent -> child route -> subchildren route, all will send the request in parallel rather than waterfall in network tab which happens in useEffect cases. The secret is that the remix has estimation of render tree before the render happens. Even code split bundles can be fetched in parallel. It also only fetches the data which is being fetched.

**If anything changes in children in terms of data mutation (if using Form or useSubmit()), remix will fetch the fresh data for all the parent components as well, elimating the use of state management (reducers)!** **_- Need to check this in depth_**

Add the mix of caching techniques based on individual URLs and a lot of control is in the hand of developers.
