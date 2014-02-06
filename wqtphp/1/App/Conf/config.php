<?php
//注意，请不要在这里配置SAE的数据库，配置你本地的数据库就可以了。
return array(
    //'配置项'=>'配置值'
    'SHOW_PAGE_TRACE'=>false,
    'URL_HTML_SUFFIX'=>'.html',
	'URL_CASE_INSENSITIVE'  => true,
	'DB_DSN' => 'mysql://root:654321@localhost:3306/app_wqtphp',
    'TMPL_PARSE_STRING'=>array(
   		'__ASSET_PUBLIC__'=>'/Public',
    	'__UPLOADED_ASSET_PUBLIC__'=>'/Public/images'
    )
);
?>