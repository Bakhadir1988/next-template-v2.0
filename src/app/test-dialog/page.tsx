'use client';

import { Button, Dialog } from '@/shared/ui';

const TestDialogPage = () => {
  return (
    <div style={{ padding: '50px' }}>
      <h1>Тестовая страница для Dialog</h1>
      <Dialog
        trigger={<Button>Открыть диалоговое окно</Button>}
        title="Заголовок диалогового окна"
        description="Описание диалогового окна. Вы можете разместить здесь любой контент."
      >
        <p>Это содержимое диалогового окна.</p>
        <p>Вы можете добавить сюда формы, текст, изображения и т.д.</p>
      </Dialog>
    </div>
  );
};

export default TestDialogPage;
