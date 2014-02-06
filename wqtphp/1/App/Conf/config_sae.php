<?php
return array(
   'DB_DSN'=>null,
   'TMPL_PARSE_STRING'=>array(
      // __PUBLIC__/upload  -->  /Public/upload -->http://appname-public.stor.sinaapp.com/upload
   '/Public/upload'=>sae_storage_root('Public').'/upload',
   		'__ASSET_PUBLIC__'=>'http://weiqt.sinaapp.com/Public',
   		'__UPLOADED_ASSET_PUBLIC__'=>'http://weiqingtie.u.qiniudn.com'
    )
);