<?php

namespace App\Services\Upload;

use Illuminate\Http\UploadedFile;

class FileUploadAction
{
    public function __construct(public PublicFileUpload $fileUpload) {}

    public function handle(
        string $path,
        ?UploadedFile $file = null,
        ?string $fileExist = null
    ): ?string {

        if (null === $file && null === $fileExist) return null;

        return null !== $fileExist
            ? $this->fileUpload->update(
                $file,
                $path,
                $fileExist,
            ) : $this->fileUpload->create(
                $file,
                $path
            );
    }
}
