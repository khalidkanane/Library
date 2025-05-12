<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title' ,
        'content' ,
        'category' ,
        'pdf',
        'image' ,
        'date_public',
        'author_id'
    ];


    public function commentaries()
    {
        return $this->hasMany(Commentaries::class);
    }


    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }
    
    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    
}