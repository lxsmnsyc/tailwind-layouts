interface ResourcePending<T> {
  status: 'pending';
  value: Promise<T>;
}

interface ResourceSuccess<T> {
  status: 'success';
  value: T;
}

interface ResourceFailure<F> {
  status: 'failure';
  value: F;
}

export type ResourceResult<T, F> =
  | ResourcePending<T>
  | ResourceSuccess<T>
  | ResourceFailure<F>;

export interface Resource<T, Args extends any[]> {
  read: (...args: Args) => T;
}

export default function createResource<T, F, Args extends any[]>(
  fetcher: (...args: Args) => Promise<T>,
): Resource<T, Args> {
  let result: ResourceResult<T, F> | undefined;

  return {
    read(...args: Args) {
      if (result == null) {
        const promise = fetcher(...args);
        promise.then(
          (value) => {
            result = {
              status: 'success',
              value,
            };
            return value;
          },
          (value: F) => {
            result = {
              status: 'failure',
              value,
            };
          },
        );
        result = {
          status: 'pending',
          value: promise,
        };
      }
      if (result.status === 'success') {
        return result.value;
      }
      throw result.value;
    },
  };
}
