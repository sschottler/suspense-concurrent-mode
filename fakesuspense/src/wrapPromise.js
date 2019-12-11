export default function wrapPromise(promise) {
  let status = "pending";
  let result;

  let suspender = promise.then(
    r => {
      status = "success";
      result = r;
    },
    e => {
      status = "error";
      result = e;
    }
  );

  return {
    read() {
      if (status === "pending") {
        // have to throw a non-promise or you will trigger
        // real suspense and it will say you suspended without fallback
        // because you wrapped in fakesuspense boundary, not real one
        throw { suspender };
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    }
  };
}
