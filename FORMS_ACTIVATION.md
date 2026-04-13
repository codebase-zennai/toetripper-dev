# All Forms - Activation Guide

## ✅ Updated: Contact Form (app/contact/page.js)

**Status**: NOW ACTIVE with:
- ✓ Form state management (name, email, message)
- ✓ Form validation (required fields)
- ✓ Submit button loading state
- ✓ Success/Error messages
- ✓ API integration (POST to `/api/contact`)

**What was added:**
```jsx
const [formData, setFormData] = useState({ name: '', email: '', message: '' });
const [status, setStatus] = useState('idle');
const handleChange = (e) => { ... }
const handleSubmit = async (e) => { ... }
```

---

## ✅ Already Active: Newsletter Forms (3 variants)

All three newsletter CTA forms are ready with **Formik + Yup validation**:

1. **NewsletterCTA.js** (Home page)
   - 6 fields + consent checkbox
   - Form field: name, phone, destination, travelTiming, travellers, budget, message

2. **NewsletterCTAMice.js** (MICE & Events page)
   - Same fields as above

3. **NewsletterCTAExperiential.js** (Experiential Holidays page)
   - Same fields as above

**Validation includes**:
- Required fields check
- Phone number validation
- Date validation for travel timing
- Positive integer for number of travellers
- Consent checkbox requirement

---

## 🔧 Setup Required

### Step 1: Create Supabase Table for Contact Submissions

Go to Supabase Dashboard → SQL Editor → Run this:

```sql
CREATE TABLE contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON contact_submissions
  FOR INSERT
  WITH CHECK (true);
```

### Step 2: Create Table for Newsletter Submissions (Optional)

```sql
CREATE TABLE newsletter_submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  destination TEXT,
  travel_timing DATE,
  travellers INTEGER,
  budget TEXT,
  message TEXT,
  form_type TEXT, -- 'general', 'mice', 'experiential'
  consent BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE newsletter_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON newsletter_submissions
  FOR INSERT
  WITH CHECK (true);
```

---

## 📍 API Endpoints Created

### `/api/contact` (POST)
**File**: `app/api/contact/route.js`

**Accepts**:
```json
{
  "name": "string",
  "email": "string", 
  "message": "string"
}
```

**Stores in**: `contact_submissions` table

**Response**:
```json
{
  "success": true,
  "message": "Message saved successfully",
  "data": { ... }
}
```

---

## 🎯 Next Steps (Optional Enhancements)

### 1. Add API for Newsletter Submissions
Create `app/api/newsletter/route.js`:
```javascript
// Similar to contact/route.js but save to newsletter_submissions table
```

### 2. Add Email Notifications
Install nodemailer:
```bash
npm install nodemailer
```

Then update API routes to send confirmation emails.

### 3. Admin Dashboard
View all submissions at admin panel to see contact & newsletter data.

---

## 📊 Form Status Summary

| Form | Location | Status | Validation | API | Database |
|------|----------|--------|------------|-----|----------|
| Contact | `/contact` | ✅ ACTIVE | + | + | + (Needs setup) |
| Newsletter General | `/` | ⚠️ Simulated | + | ❌ | ❌ |
| Newsletter MICE | `/services/mice-incentive` | ⚠️ Simulated | + | ❌ | ❌ |
| Newsletter Experiential | `/services/experiential-holidays` | ⚠️ Simulated | + | ❌ | ❌ |

**Legend**:
- ✅ = Ready to use
- ⚠️ = Has validation but no real submission
- \+ = Feature exists
- ❌ = Not yet implemented

---

## 🚀 How Forms Work Now

1. **User fills form** → Input state updates in real-time
2. **Clicks submit** → Client-side validation runs (Formik/manual)
3. **If valid** → Button shows "Sending..." (disabled)
4. **API request sent** → Data goes to backend
5. **Backend processes** → Saves to Supabase
6. **Response received** → Show success/error message
7. **Auto-reset after 5s** → Form clears for next submission
