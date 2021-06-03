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

export interface Resource<T> {
  read: () => T;
}

export default function createResource<T, F>(fetcher: () => Promise<T>): Resource<T> {
  let result: ResourceResult<T, F> | undefined;

  return {
    read() {
      if (result == null) {
        const promise = fetcher();
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
