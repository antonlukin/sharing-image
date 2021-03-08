<div class="sharing-image-poster">
	<div  style="max-width: 1100px; display: flex;">

		<div class="sharing-image-options">
			<fieldset style="width: 300px; margin-bottom: 25px">
				<legend>Название шаблона</legend>
				<input name="test22" type="text" style="width: 100%;">
				<small style="display: block;">Используется только в админке</small>
			</fieldset>

			<fieldset>
				<legend>Настройки фона постера</legend>

				<p>
					<label>
						<input name="test" type="radio"> Выбирать для каждой записи отдельно
					</label>

					<label>
						<input name="test" type="radio"> Использовать миниатюру записи
					</label>

					<label>
						<input name="test" type="radio"> Загрузить общий статичный фон
					</label>
				</p>

				<p>
					<button class="button" disabled style="margin-right: 10px;">Выбрать изображение</button>
				</p>
			</fieldset>

			<fieldset style="display: flex;">
				<p style="margin-right: 10px;">
					<strong style="margin-bottom: 5px;">Ширина постера</strong>
					<input name="test2" type="text" value="1200" style="width: 142px;">
				</p>

				<p>
					<strong style="margin-bottom: 5px;">Высота постера</strong>
					<input name="test3" type="text" value="630" style="width: 142px;">
				</p>
			</fieldset>

			<fieldset>
				<legend>Добавить слои</legend>

				<p>
					Здесь какой-то длинный текст о важности и охуенности нашего плагина.<br>
					О том, что делают фильтры и картинки, а так же текст. Порядок важен.
				</p>

				<div>
					<select style="min-width: 200px; margin-right: 8px;">
						<option>Надпись</option>
						<option>Изображение</option>
						<option>Фильтр</option>
						<option>Линия</option>
						<option>Эллипс</option>
						<option>Прямоугольник</option>
					</select>

					<button class="button" type="button">Добавить</button>
				</div>
			</fieldset>

			<div style="position: relative; margin: 0 0 15px; padding: 10px 10px 12px; background-color: #fff; box-shadow: 0 1px 1px rgb(0 0 0 / 4%); border: 1px solid #ccd0d4; border-radius: 4px;">
				<p style="margin-bottom:7px;">
					<strong style="font-size: 16px; font-weight: 600;">Изображение</strong>

					<button style="cursor: pointer; padding: 0; color: #999; background: transparent; border: none; position: absolute; right: 8px; top: 8px; font-size: 16px;" class="dashicons dashicons-arrow-up-alt" type="button"></button>
				</p>

				<p style="margin-bottom:20px;">
					Вы можете поместить изображение в любую часть постера. Более подробно о настройках читайте на <a href="">странице помощи</a>.
				</p>

				<p  style="display: block; width: 100%;">
					<strong style="margin-bottom: 5px;">Ссылка на изображение</strong>
					<input name="test2" type="text" value="" style="display: block; width: calc(100% - 2px);">
				</p>

				<fieldset style="display: flex; flex-flow: row wrap; margin-bottom: 0; width: calc(100% - 2px);">
					<p style="margin-right: 10%; display: block; flex: 0 0 45%;">
						<strong style="margin-bottom: 5px;">Отступ от верха</strong>
						<input name="test2" type="text" value="5%" style="width: 100%; display: block">
					</p>

					<p style="display: block; flex: 0 0 45%;">
						<strong style="margin-bottom: 5px;">Отступ от низа</strong>
						<input name="test3" type="text" value="5%" style="width: 100%;  display: block">
					</p>

					<small style="flex: 0 0 100%; margin-top: -10px; margin-bottom: 10px;">Целое число или процент</small>
				</fieldset>

				<p style="margin-bottom: 0; width: 100%; display: flex; justify-content: space-between;">
					<button style="cursor: pointer; padding: 0; color: #2271b1; background: transparent; border: none; border-bottom: solid 1px;">Больше настроек</button>
					<button style="cursor: pointer; padding: 0; color: #a00; background: transparent; border: none; font-size: 18px;" class="dashicons dashicons-trash" type="button"></button>
				</p>
			</div>

			<div style="margin: 0 0 15px; padding: 10px 10px 15px; background-color: #fff; box-shadow: 0 1px 1px rgb(0 0 0 / 4%); border: 1px solid #ccd0d4; border-radius: 4px;">
				<p style="position: relative; margin-bottom:7px;">
					<strong style="font-size: 16px; font-weight: 600;">Надпись</strong>

					<button style="cursor: pointer; padding: 0; color: #999; background: transparent; border: none; position: absolute; right: 0; top: 0; font-size: 16px;" class="dashicons dashicons-arrow-up-alt" type="button"></button>
				</p>

				<p style="margin-bottom:20px;">
					Динамическая надпись будет заполняться каждый раз на странице редактирования поста. Более подробно о настройках читайте на <a href="">странице помощи</a>.
				</p>

				<fieldset style="display: flex; flex-flow: row wrap; justify-content: space-between; margin-bottom: 0; width: 100%;">
					<p style="display: block; flex: 0 0 22%; margin-right: 2.5%;">
						<strong style="margin-bottom: 5px;">Отступ от верха</strong>
						<input name="test2" type="text" value="5%" style="width: 100%; display: block">
					</p>

					<p style="display: block; flex: 0 0 22%; margin-right: auto;">
						<strong style="margin-bottom: 5px;">Отступ от низа</strong>
						<input name="test3" type="text" value="5%" style="width: 100%;  display: block">
					</p>

					<p style="display: block; flex: 0 0 22%; margin-right: 2.5%;">
						<strong style="margin-bottom: 5px;">Ширина</strong>
						<input name="test2" type="text" value="5%" style="width: 100%; display: block">
					</p>

					<p style="display: block; flex: 0 0 22%;">
						<strong style="margin-bottom: 5px;">Высота</strong>
						<input name="test3" type="text" value="5%" style="width: 100%;  display: block">
					</p>

					<small style="flex: 0 0 100%; margin-top: -10px; margin-bottom: 10px;">Используйте целое число для пикселей или процент.</small>
				</fieldset>

				<p>
					<label>
						<input type="checkbox" name="test3"> Динамическое поле. Заполняется каждый раз со страницы записи.
					</label>
				</p>


				<p>
					<strong style="margin-bottom: 5px;">Название поля</strong>
					<input name="test2" type="text" value="" style="width: calc(100% - 2px); display: block">
					<small>Используется только для удобства, когда надписей несколько</small>
				</p>

				<fieldset>
					<legend>Предустановленная надпись</legend>

					<p>
						<label>
							<input name="test" type="radio"> Заполнять вручную
						</label>

						<label>
							<input name="test" type="radio"> Взять из заголовка записи
						</label>

						<label>
							<input name="test" type="radio"> Предзаполнять текстом из отрывка
						</label>
					</p>
				</fieldset>

				<p style="">
					<strong style="margin-bottom: 5px;">Цвет надписи</strong>
					<input type="color">
				</p>

				<p style="margin-bottom: 0; width: 100%; display: flex; justify-content: space-between;">
					<button style="cursor: pointer; padding: 0; color: #2271b1; background: transparent; border: none; border-bottom: solid 1px;">Больше настроек</button>
					<button style="cursor: pointer; padding: 0; color: #a00; background: transparent; border: none; font-size: 18px;" class="dashicons dashicons-trash" type="button"></button>
				</p>
			</div>
		</div>

		<div class="sharing-image-preview">
			<?php
				printf(
					'<img src="%s" alt="">',
					SHARING_IMAGE_URL . '/assets/posters/1.jpg'
				);
			?>

			<p style="display: flex; align-items: center;">
				<button class="button">Сгенерировать вручную</button>

				<label style="margin-left: auto;">
					<input type="checkbox"> Отладочный режим
				</label>
			</p>
		</div>
	</div>

	<div>
		<button style="margin-right: 10px;" class="button button-primary">Сохранить</button>
		<button class="button">Вернуться к списку</button>
	</div>
</div>