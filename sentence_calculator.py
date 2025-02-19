# Функция для перевода срока в месяцы и обратно
def years_to_months(years):
    return years * 12

def months_to_years(months):
    years = months // 12
    remaining_months = months % 12
    return years, remaining_months

# Функция для расчёта срока наказания
def calculate_penalty(min_months, max_years, is_preparation=False, is_attempt=False, 
                      is_recidivism=False, is_plea_bargain=False, is_jury_verdict=False):
    # Преобразуем максимальный срок в месяцы
    max_penalty_months = years_to_months(max_years)

    # Учитываем покушение или приготовление
    if is_preparation:
        max_penalty_months = min(max_penalty_months, max_penalty_months // 2)
    elif is_attempt:
        max_penalty_months = min(max_penalty_months, max_penalty_months * 3 // 4)

    # Учитываем рецидив
    if is_recidivism:
        min_penalty_months = max(min_months, max_penalty_months // 3)

    # Учитываем явку с повинной, досудебное соглашение и другие обстоятельства
    if is_plea_bargain:
        max_penalty_months = min(max_penalty_months, max_penalty_months * 2 // 3)  # Исправлено на 2/3

    if is_jury_verdict:
        max_penalty_months = min(max_penalty_months, max_penalty_months * 2 // 3)

    # Переводим в года и месяцы
    min_years, min_months = months_to_years(min_months)
    max_years, max_months = months_to_years(max_penalty_months)

    return (f"Минимальный срок наказания: {min_years} лет {min_months} месяцев\n"
            f"Максимальный срок наказания: {max_years} лет {max_months} месяцев")

# Ввод данных пользователем
min_months = int(input("Введите минимальный срок наказания в месяцах: "))
max_years = int(input("Введите максимальный срок наказания в годах: "))

# Флаги для других условий
is_preparation = input("Является ли преступление приготовлением? (да/нет): ").lower() == 'да'
is_attempt = input("Является ли преступление покушением? (да/нет): ").lower() == 'да'
is_recidivism = input("Есть ли рецидив? (да/нет): ").lower() == 'да'
is_plea_bargain = input("Есть ли досудебное соглашение? (да/нет): ").lower() == 'да'
is_jury_verdict = input("Есть ли вердикт присяжных? (да/нет): ").lower() == 'да'

# Расчёт и вывод результата
result = calculate_penalty(min_months, max_years, 
                           is_recidivism=is_recidivism, is_preparation=is_preparation, 
                           is_attempt=is_attempt, is_plea_bargain=is_plea_bargain, 
                           is_jury_verdict=is_jury_verdict)

print(result)
