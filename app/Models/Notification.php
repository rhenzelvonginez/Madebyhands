<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
  use HasFactory;

  protected $table = 'notifications';

  protected $fillable = [
    'title',
    'body',
    'is_read',
    'created_by',
    'to_user_id',
  ];

  public function createdBy()
  {
    return $this->belongsTo(User::class, 'created_by');
  }

  public function toUser()
  {
    return $this->belongsTo(User::class, 'to_user_id');
  }
}
