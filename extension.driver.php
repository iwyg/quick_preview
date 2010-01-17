<?php

	class extension_quick_preview extends Extension
	{
		public function about()
		{
			return array(
				'name' => 'Quick Preview',
				'version' => '0.5',
				'release-date' => '2010-01-16',
				'author' => array(
						'name' => 'Grzegorz Michlicki',
						'website' => 'http://grzegorz.michlicki.pl/',
						'email' => 'grzegorz@michlicki.pl'
					)
			);
		}
		
		public function getSubscribedDelegates()
		{
			return array(
				array(
					'page' => '/administration/',
					'delegate' => 'AdminPagePreGenerate',
					'callback' => 'appendAssets'
				)
			);
		}
		
		public function appendAssets($context)
		{
			$callback = Administration::instance()->getPageCallback();
			
			if ($callback['driver'] == 'publish' && ($callback['context']['page'] == 'index' || $callback['context']['page'] == 'edit'))
			{
				$page = Administration::instance()->Page;
				
				$page->addStylesheetToHead(URL . '/extensions/quick_preview/assets/quick_preview.css', 'screen', 40);
				$page->addScriptToHead(URL . '/extensions/quick_preview/assets/quick_preview.js', 100);
			}
		}

	}
