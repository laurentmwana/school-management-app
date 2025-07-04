<?php

namespace App\Services\Upload;

class PublicFileUpload extends AbstractFileUpload
{
    public function __construct()
    {
        parent::__construct('public');
    }
}
