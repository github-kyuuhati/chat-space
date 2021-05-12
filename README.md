# ChatSpace DB設計
## userテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|string|null: false|
|email|string|null: false|
|password|string|null: false|

### Association
- has_many :posts
- has_many :groups,  through:  :groups_users
- has_many :groups_users

## postテーブル
|Column|Type|Options|
|------|----|-------|
|post|text||
|image|text||
|user_id|integer|null: false, 
foreign_key: true|
|group_id|integer|null: false, 
foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|string|null: false|
### Association
- has_many :posts
- has_many :users,  through:  :groups_users
- has_many :groups_users

## groups_usersテーブル（中間テーブル）
|Column|Type|Options|
|------|----|-------|
|id|integer||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
