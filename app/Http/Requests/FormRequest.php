<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest as BaseFormRequest;
use Illuminate\Support\Collection;
use InvalidArgumentException;

class FormRequest extends BaseFormRequest
{
    /**
     * Converts a base64 encoded, comma-separated string from the request into a Collection.
     *
     * This method handles request parameters that come in as base64 encoded strings
     * containing comma-separated values. It provides error handling and validation
     * to ensure reliable data processing.
     *
     * @param string $key The request parameter key to process
     * @param string $separator what is used to split the string (default: `,`)
     * @param bool $strictMode Whether to throw exceptions on invalid data (default: false)
     * @return Collection A collection of decoded values
     * @throws InvalidArgumentException When strict mode is on and decoding fails
     */

    protected function getCollectionFromRequest(string $key, string $separator = ',', bool $strictMode = false): Collection
    {
        if ( ! $this->has($key)) {
            return collect([]);
        }


        try {
            $encodedValue = $this->get($key);
            if ( ! is_string($encodedValue)) {
                throw new InvalidArgumentException("Request value for '{$key}' must be a string");
            }

            $decodedValue = base64_decode($encodedValue, true);
            if (false === $decodedValue) {
                throw new InvalidArgumentException("Invalid base64 encoding for '{$key}'");
            }

            return collect(explode($separator, $decodedValue))
                ->filter(fn($value) => mb_strlen(trim($value)) > 0)
                ->map(fn($value) => trim($value))
                ->values();

        } catch (InvalidArgumentException $e) {
            if ($strictMode) {
                throw $e;
            }

            logger()->debug("Failed to process request collection for key '{$key}'", [
                'error' => $e->getMessage(),
                'value' => $this->get($key),
            ]);

            return collect([]);
        }
    }
}
