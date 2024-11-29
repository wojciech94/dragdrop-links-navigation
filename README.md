# System Zarządzania Nawigacją

Aplikacja webowa umożliwiająca zarządzanie elementami nawigacji za pomocą intuicyjnego interfejsu drag & drop.

---

## **Podgląd aplikacji**
**Link do aplikacji:** [System zarządzania nawigacją](https://dragdrop-links-navigation.vercel.app/)

## **Funkcjonalności**
1. **Lista nawigacji:**
   - Wyświetla listę elementów nawigacji z nazwami (label) i adresami URL.
   - Umożliwia reorganizację elementów za pomocą drag & drop.
   - Każdy element umożliwia edycję swoich danych, usunięcie oraz podpiecie do siebie dodatkowej nawigacji.

2. **Formularz dodawania nawigacji:**
   - Pozwala dodać nowe elementy nawigacji z następującymi polami:
     - **Nazwa:** Nazwa elementu nawigacji.
     - **URL:** Adres URL przypisany do elementu.
     - **Pod-elementy:** Możliwość dodawania zagnieżdżonych pod-elementów.
   - Walidacja pól:
     - Pole `label` jest wymagane.
     - Pole `url`, jeśli wypełnione, musi być poprawnym adresem URL.

3. **Formularz edycji nawigacji:**
   - Pozwala edytować istniejące elementy nawigacji, w tym ich pod-elementy.

---

## **Technologie użyte w projekcie**
- **Framework frontendowy:** [Next.js](https://nextjs.org/)
- **Stylizacja:** [Tailwind CSS](https://tailwindcss.com/)
- **Drag & Drop:** [dnd-kit](https://dndkit.com/)
- **Formularze i walidacja:** [Formik](https://formik.org/)
- **Zarządzanie stanem:** Lokalny stan przy użyciu hooków React.

---

## **Instalacja**
### Wymagania wstępne
- Node.js (>= 16.x.x)
- Menedżer pakietów: npm lub yarn

### Kroki instalacji
1. Sklonuj repozytorium:
   ```bash
   git clone https://github.com/wojciech94/dragdrop-links-navigation.git
   ```
2. Przejdź do folderu projektu
   ```bash
   cd dragdrop-links-navigation
   ```
3. Zainstaluj dependencies
    ```bash
   npm install
   ```
4. Uruchom server developerski
    ```bash
   npm run dev
   ```
5. Przejdź na adres [http://localhost:3000](http://localhost:3000) w przeglądarce
